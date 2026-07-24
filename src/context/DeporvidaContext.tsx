import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { LibreriaData, User, UserRole, ViewName, NavParams, Libro, CarritoItem } from '../types';
import { SAMPLE_LIBROS } from '../utils/constants';
import { authService } from '../services/authService';
import { libroService } from '../services/libroService';
import { carritoService } from '../services/carritoService';
import type { ItemCarritoResponse } from '../services/carritoService';
import { API_BASE_URL } from '../services/api';
import { connectWebSocket, disconnectWebSocket } from '../services/websocketService';

interface DeporvidaContextType {
  currentUser: User | null;
  currentView: ViewName;
  navParams: NavParams;
  data: LibreriaData;
  carrito: CarritoItem[];
  apiLibros: Libro[];
  apiLoading: boolean;
  apiError: string | null;
  token: string | null;
  navigate: (view: ViewName, params?: NavParams) => void;
  doLogin: (username: string, password: string, redirectTo?: ViewName) => Promise<{ success: boolean; message?: string }>;
  doSignup: (role: UserRole, formData: Record<string, string>, redirectTo?: ViewName) => Promise<{ success: boolean; message?: string }>;
  doLogout: () => void;
  saveData: (data: LibreriaData) => void;
  addColaborador: (formData: Record<string, string>) => Promise<boolean>;
  addCliente: (formData: Record<string, string>) => Promise<boolean>;
  updateColaborador: (id: number, formData: Record<string, string>) => Promise<void>;
  updateCliente: (id: number, formData: Record<string, string>) => Promise<void>;
  deleteColaborador: (id: number) => Promise<void>;
  deleteCliente: (id: number) => Promise<void>;
  approveColaborador: (id: number) => Promise<void>;
  approveCliente: (id: number) => Promise<void>;
  guardarPedidos: (categoria: string, date: string, records: { codigo: string; estado: 'Entregado' | 'Pendiente' }[]) => Promise<void>;
  postAviso: (message: string) => Promise<void>;
  getInitialData: () => LibreriaData;
  fetchApiLibros: () => Promise<void>;
  addToCart: (libro: Libro, cantidad?: number) => void;
  removeFromCart: (libroId: number) => void;
  updateCartQuantity: (libroId: number, cantidad: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  favoritos: number[];
  toggleFavorite: (libroId: number) => void;
  isFavorito: (libroId: number) => boolean;
  getFavoritos: () => Libro[];
}

const DeporvidaContext = createContext<DeporvidaContextType | undefined>(undefined);

function getInitialData(): LibreriaData {
  return {
    users: [
      { id: 1, firstName: 'Admin', lastName: 'Deporvida', username: 'admin', password: 'admin', role: 'admin' },
      { id: 2, firstName: 'Carlos', lastName: 'Garcia', username: 'carlos', password: '123', role: 'colaborador' },
      { id: 3, firstName: 'Maria', lastName: 'Lopez', username: 'maria', password: '123', role: 'colaborador' },
      { id: 4, firstName: 'Juan', lastName: 'Perez', username: 'juan', password: '123', role: 'cliente' },
      { id: 5, firstName: 'Ana', lastName: 'Torres', username: 'ana', password: '123', role: 'cliente' },
      { id: 6, firstName: 'Luis', lastName: 'Ramirez', username: 'luis', password: '123', role: 'cliente' },
    ],
    colaboradores: [
      { id: 1, userId: 2, salary: 2500, mobile: '555-0101', joinDate: '2024-01-15', status: true },
      { id: 2, userId: 3, salary: 3000, mobile: '555-0102', joinDate: '2024-02-20', status: true },
    ],
    clientes: [
      { id: 1, userId: 4, codigo: 'CL-101', mobile: '555-0201', compras: 180, categoria: 'Novela', status: true },
      { id: 2, userId: 5, codigo: 'CL-102', mobile: '555-0202', compras: 95, categoria: 'Infantil', status: true },
      { id: 3, userId: 6, codigo: 'CL-201', mobile: '555-0203', compras: 340, categoria: 'Negocios', status: true },
    ],
    pedidos: [],
    avisos: [
      { id: 1, date: '2024-03-01', by: 'Admin', message: '2x1 en novelas seleccionadas este viernes' },
      { id: 2, date: '2024-03-05', by: 'Admin', message: 'Llegada de nuevos títulos de la categoría Ciencia antes del 10 de marzo' },
    ],
    libros: SAMPLE_LIBROS,
    nextId: { users: 7, colaboradores: 3, clientes: 4, avisos: 3, pedidos: 1, libros: SAMPLE_LIBROS.length + 1 }
  };
}

function loadData(): LibreriaData {
  if (typeof window === 'undefined') return getInitialData();
  const saved = localStorage.getItem('deporvida-libreriaData');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.libros)) return parsed;
    } catch {
      // ignore corrupt data
    }
  }
  const initial = getInitialData();
  saveDataToStorage(initial);
  return initial;
}

function loadCart(): CarritoItem[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('deporvida-carrito');
  if (saved) return JSON.parse(saved);
  return [];
}

function saveCartToStorage(cart: CarritoItem[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('deporvida-carrito', JSON.stringify(cart));
  }
}

function loadFavoritos(): number[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('deporvida-favoritos');
  if (saved) return JSON.parse(saved);
  return [];
}

function saveFavoritosToStorage(favs: number[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('deporvida-favoritos', JSON.stringify(favs));
  }
}

function saveDataToStorage(data: LibreriaData) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('deporvida-libreriaData', JSON.stringify(data));
  }
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function mapBackendLibro(b: any): Libro {
  return {
    id: b.id,
    titulo: b.titulo,
    autor: b.autors?.map((a: any) => a.nombre).join(', ') || 'Desconocido',
    categoria: b.categoria?.nombre || 'General',
    precio: b.precioEfectivo || b.precio,
    imagen: b.urlPortada || `${API_BASE_URL}/imagenes/default.png`,
    descripcion: b.descripcion,
    stock: b.inventario?.cantidad ?? 0,
    urlPortada: b.urlPortada,
    urlMiniatura: b.urlMiniatura,
    precioEfectivo: b.precioEfectivo,
    enOferta: b.enOferta,
    autors: b.autors,
    inventario: b.inventario,
  };
}

function mapBackendCartItem(item: ItemCarritoResponse): CarritoItem {
  return {
    libro: mapBackendLibro(item.libro),
    cantidad: item.cantidad,
    itemId: item.id,
  };
}

export function DeporvidaProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewName>('home');
  const [navParams, setNavParams] = useState<NavParams>({});
  const [data, setData] = useState<LibreriaData>(() => loadData());
  const [carrito, setCarrito] = useState<CarritoItem[]>(() => loadCart());
  const [favoritos, setFavoritos] = useState<number[]>(() => loadFavoritos());
  const [apiLibros, setApiLibros] = useState<Libro[]>([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('deporvida-token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('deporvida-token', token);
    } else {
      localStorage.removeItem('deporvida-token');
    }
  }, [token]);

  useEffect(() => {
    saveDataToStorage(data);
  }, [data]);

  useEffect(() => {
    saveCartToStorage(carrito);
  }, [carrito]);

  const fetchRealCart = useCallback(async () => {
    if (!token) return;
    try {
      const response = await carritoService.getCarrito();
      const mapped = response.data.items.map(mapBackendCartItem);
      setCarrito(mapped);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Error desconocido';
      setApiError(`Error al obtener el carrito: ${msg}`);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchRealCart();
    } else {
      setCarrito(loadCart());
    }
  }, [token, fetchRealCart]);

  useEffect(() => {
    saveFavoritosToStorage(favoritos);
  }, [favoritos]);

  useEffect(() => {
    const handleUnauthorized = () => {
      setCurrentUser(null);
      setToken(null);
      setApiError('Tu sesión expiró, inicia sesión de nuevo');
      setCurrentView('login');
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  useEffect(() => {
    if (token) {
      const disconnect = connectWebSocket(token, (msg: any) => {
        if (msg.estado) {
          setApiError(`Pedido ${msg.numeroPedido || ''} actualizado a: ${msg.estado}`);
        }
      });
      return () => {
        disconnect();
      };
    } else {
      disconnectWebSocket();
    }
  }, [token]);

  const navigate = useCallback((view: ViewName, params: NavParams = {}) => {
    setCurrentView(view);
    setNavParams(params);
  }, []);

  const doLogin = useCallback(async (username: string, password: string, redirectTo?: ViewName): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await authService.login({ nombreUsuario: username, contrasena: password });
      const authData = response.data;
      setToken(authData.token);
      const user: User = {
        id: authData.id,
        firstName: authData.nombres || '',
        lastName: authData.apellidos || '',
        username: authData.nombreUsuario,
        password: '',
        role: authData.roles.includes('ROL_ADMIN')
          ? 'admin'
          : authData.roles.includes('ROL_VENDEDOR')
            ? 'colaborador'
            : 'cliente',
      };
      setCurrentUser(user);

      // Sync local cart to backend
      const localCart = loadCart();
      if (localCart.length > 0) {
        for (const item of localCart) {
          try {
            await carritoService.addItem({ libroId: item.libro.id, cantidad: item.cantidad });
          } catch (err: any) {
            console.error(`Error syncing cart item ${item.libro.id}:`, err);
          }
        }
        localStorage.removeItem('deporvida-carrito');
      }
      try {
        const cartResponse = await carritoService.getCarrito();
        setCarrito(cartResponse.data.items.map(mapBackendCartItem));
      } catch (err: any) {
        console.error('Error fetching cart after login:', err);
      }

      if (redirectTo) {
        navigate(redirectTo);
      } else if (authData.roles.includes('ROL_ADMIN')) {
        navigate('admin-dashboard');
      } else if (authData.roles.includes('ROL_VENDEDOR')) {
        navigate('colaborador-dashboard');
      } else {
        navigate('cliente-dashboard');
      }
      return { success: true };
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Error al iniciar sesión';
      return { success: false, message: msg };
    }
  }, [navigate]);

  const doSignup = useCallback(async (_role: UserRole, formData: Record<string, string>, redirectTo?: ViewName): Promise<{ success: boolean; message?: string }> => {
    if (!formData.firstName || !formData.lastName || !formData.username || !formData.password) {
      return { success: false, message: 'Todos los campos obligatorios deben ser completados' };
    }

    try {
      const response = await authService.register({
        nombreUsuario: formData.username,
        correo: formData.email || `${formData.username}@deporvida.com`,
        contrasena: formData.password,
        nombres: formData.firstName,
        apellidos: formData.lastName,
        telefono: formData.mobile || '',
      });
      setToken(response.data.token);
      const user: User = {
        id: response.data.id,
        firstName: response.data.nombres || formData.firstName,
        lastName: response.data.apellidos || formData.lastName,
        username: response.data.nombreUsuario,
        password: '',
        role: 'cliente',
      };
      setCurrentUser(user);

      try {
        const cartResponse = await carritoService.getCarrito();
        setCarrito(cartResponse.data.items.map(mapBackendCartItem));
      } catch (err: any) {
        console.error('Error fetching cart after signup:', err);
      }

      navigate(redirectTo || 'cliente-dashboard');
      return { success: true };
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Error al registrarse';
      return { success: false, message: msg };
    }
  }, [navigate]);

  const doLogout = useCallback(() => {
    setCurrentUser(null);
    setToken(null);
    navigate('home');
  }, [navigate]);

  const saveData = useCallback((newData: LibreriaData) => {
    setData(newData);
  }, []);

  const addColaborador = useCallback(async (formData: Record<string, string>): Promise<boolean> => {
    if (!formData.firstName || !formData.lastName || !formData.username || !formData.password) return false;
    if (data.users.find(u => u.username === formData.username)) return false;

    setData(prev => {
      const newData = { ...prev };
      const newUser: User = {
        id: newData.nextId.users++,
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        password: formData.password,
        role: 'colaborador'
      };
      newData.users = [...newData.users, newUser];
      newData.colaboradores = [...newData.colaboradores, {
        id: newData.nextId.colaboradores++,
        userId: newUser.id,
        salary: parseInt(formData.salary || '0') || 0,
        mobile: formData.mobile || '',
        joinDate: getToday(),
        status: true
      }];
      return newData;
    });
    return true;
  }, [data.users]);

  const addCliente = useCallback(async (formData: Record<string, string>): Promise<boolean> => {
    if (!formData.firstName || !formData.lastName || !formData.username || !formData.password) return false;
    if (data.users.find(u => u.username === formData.username)) return false;

    setData(prev => {
      const newData = { ...prev };
      const newUser: User = {
        id: newData.nextId.users++,
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        password: formData.password,
        role: 'cliente'
      };
      newData.users = [...newData.users, newUser];
      newData.clientes = [...newData.clientes, {
        id: newData.nextId.clientes++,
        userId: newUser.id,
        codigo: formData.codigo || '',
        mobile: formData.mobile || '',
        compras: parseInt(formData.compras || '0') || 0,
        categoria: formData.categoria || 'Novela',
        status: true
      }];
      return newData;
    });
    return true;
  }, [data.users]);

  const updateColaborador = useCallback(async (id: number, formData: Record<string, string>): Promise<void> => {
    setData(prev => {
      const newData = { ...prev };
      const c = newData.colaboradores.find(c => c.id === id);
      if (!c) return newData;
      const u = newData.users.find(u => u.id === c.userId);
      if (u) {
        u.firstName = formData.firstName;
        u.lastName = formData.lastName;
        u.username = formData.username;
        if (formData.password) u.password = formData.password;
      }
      c.mobile = formData.mobile;
      c.salary = parseInt(formData.salary || '0') || 0;
      return newData;
    });
  }, []);

  const updateCliente = useCallback(async (id: number, formData: Record<string, string>): Promise<void> => {
    setData(prev => {
      const newData = { ...prev };
      const c = newData.clientes.find(c => c.id === id);
      if (!c) return newData;
      const u = newData.users.find(u => u.id === c.userId);
      if (u) {
        u.firstName = formData.firstName;
        u.lastName = formData.lastName;
        u.username = formData.username;
        if (formData.password) u.password = formData.password;
      }
      c.codigo = formData.codigo;
      c.categoria = formData.categoria;
      c.mobile = formData.mobile;
      c.compras = parseInt(formData.compras || '0') || 0;
      return newData;
    });
  }, []);

  const deleteColaborador = useCallback(async (id: number): Promise<void> => {
    setData(prev => {
      const newData = { ...prev };
      const c = newData.colaboradores.find(c => c.id === id);
      if (!c) return newData;
      newData.users = newData.users.filter(u => u.id !== c.userId);
      newData.colaboradores = newData.colaboradores.filter(c => c.id !== id);
      return newData;
    });
  }, []);

  const deleteCliente = useCallback(async (id: number): Promise<void> => {
    setData(prev => {
      const newData = { ...prev };
      const c = newData.clientes.find(c => c.id === id);
      if (!c) return newData;
      newData.users = newData.users.filter(u => u.id !== c.userId);
      newData.clientes = newData.clientes.filter(c => c.id !== id);
      return newData;
    });
  }, []);

  const approveColaborador = useCallback(async (id: number): Promise<void> => {
    setData(prev => {
      const newData = { ...prev };
      const c = newData.colaboradores.find(c => c.id === id);
      if (c) c.status = true;
      return newData;
    });
  }, []);

  const approveCliente = useCallback(async (id: number): Promise<void> => {
    setData(prev => {
      const newData = { ...prev };
      const c = newData.clientes.find(c => c.id === id);
      if (c) c.status = true;
      return newData;
    });
  }, []);

  const guardarPedidos = useCallback(async (categoria: string, date: string, records: { codigo: string; estado: 'Entregado' | 'Pendiente' }[]): Promise<void> => {
    if (!date) return;
    setData(prev => {
      const newData = { ...prev };
      for (const record of records) {
        newData.pedidos.push({
          id: newData.nextId.pedidos++,
          codigo: record.codigo,
          date,
          categoria,
          estado: record.estado
        });
      }
      return newData;
    });
  }, []);

  const postAviso = useCallback(async (message: string): Promise<void> => {
    if (!message || !currentUser) return;
    setData(prev => {
      const newData = { ...prev };
      newData.avisos.push({
        id: newData.nextId.avisos++,
        date: getToday(),
        by: currentUser.firstName,
        message
      });
      return newData;
    });
  }, [currentUser]);

  const fetchApiLibros = useCallback(async () => {
    setApiLoading(true);
    try {
      const response = await libroService.getAll({ size: 100 });
      const mapped = response.data.content.map(mapBackendLibro);
      setApiLibros(mapped);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Error desconocido';
      setApiError(`No se pudo cargar el catálogo: ${msg}`);
      setApiLibros([]);
    } finally {
      setApiLoading(false);
    }
  }, []);

  // Carrito functions
  const addToCart = useCallback((libro: Libro, cantidad: number = 1) => {
    if (token) {
      setApiError(null);
      carritoService.addItem({ libroId: libro.id, cantidad })
        .then(() => fetchRealCart())
        .catch(err => {
          const msg = err.response?.data?.message || err.message || 'Error desconocido';
          setApiError(`Error al agregar al carrito: ${msg}`);
        });
    } else {
      setCarrito(prev => {
        const existing = prev.find(item => item.libro.id === libro.id);
        if (existing) {
          return prev.map(item =>
            item.libro.id === libro.id
              ? { ...item, cantidad: Math.min(item.cantidad + cantidad, 1000) }
              : item
          );
        }
        return [...prev, { libro, cantidad: Math.min(cantidad, 1000) }];
      });
    }
  }, [token, fetchRealCart]);

  const removeFromCart = useCallback((libroId: number) => {
    if (token) {
      setApiError(null);
      setCarrito(prev => {
        const item = prev.find(i => i.libro.id === libroId);
        if (item?.itemId) {
          carritoService.removeItem(item.itemId)
            .then(() => fetchRealCart())
            .catch(err => {
              const msg = err.response?.data?.message || err.message || 'Error desconocido';
              setApiError(`Error al eliminar del carrito: ${msg}`);
              fetchRealCart();
            });
        }
        return prev.filter(i => i.libro.id !== libroId);
      });
    } else {
      setCarrito(prev => prev.filter(item => item.libro.id !== libroId));
    }
  }, [token, fetchRealCart]);

  const updateCartQuantity = useCallback((libroId: number, cantidad: number) => {
    if (token) {
      setApiError(null);
      setCarrito(prev => {
        const item = prev.find(i => i.libro.id === libroId);
        if (item?.itemId) {
          if (cantidad <= 0) {
            carritoService.removeItem(item.itemId)
              .then(() => fetchRealCart())
              .catch(err => {
                const msg = err.response?.data?.message || err.message || 'Error desconocido';
                setApiError(`Error al actualizar cantidad: ${msg}`);
                fetchRealCart();
              });
          } else {
            carritoService.updateItem(item.itemId, cantidad)
              .then(() => fetchRealCart())
              .catch(err => {
                const msg = err.response?.data?.message || err.message || 'Error desconocido';
                setApiError(`Error al actualizar cantidad: ${msg}`);
                fetchRealCart();
              });
          }
        }
        return cantidad <= 0
          ? prev.filter(i => i.libro.id !== libroId)
          : prev.map(i => i.libro.id === libroId ? { ...i, cantidad: Math.min(cantidad, 1000) } : i);
      });
    } else {
      setCarrito(prev => {
        if (cantidad <= 0) {
          return prev.filter(item => item.libro.id !== libroId);
        }
        return prev.map(item =>
          item.libro.id === libroId
            ? { ...item, cantidad: Math.min(cantidad, 1000) }
            : item
        );
      });
    }
  }, [token, fetchRealCart]);

  const clearCart = useCallback(() => {
    if (token) {
      setApiError(null);
      carritoService.clearCarrito()
        .then(() => setCarrito([]))
        .catch(err => {
          const msg = err.response?.data?.message || err.message || 'Error desconocido';
          setApiError(`Error al vaciar el carrito: ${msg}`);
          fetchRealCart();
        });
    } else {
      setCarrito([]);
    }
  }, [token, fetchRealCart]);

  const getCartTotal = useCallback(() => {
    return carrito.reduce((total, item) => total + item.libro.precio * item.cantidad, 0);
  }, [carrito]);

  const getCartCount = useCallback(() => {
    return carrito.reduce((count, item) => count + item.cantidad, 0);
  }, [carrito]);

  const toggleFavorite = useCallback((libroId: number) => {
    setFavoritos(prev =>
      prev.includes(libroId) ? prev.filter(id => id !== libroId) : [...prev, libroId]
    );
  }, []);

  const isFavorito = useCallback((libroId: number) => {
    return favoritos.includes(libroId);
  }, [favoritos]);

  const getFavoritos = useCallback(() => {
    return apiLibros.filter(l => favoritos.includes(l.id));
  }, [apiLibros, favoritos]);

  return (
    <DeporvidaContext.Provider value={{
      currentUser,
      currentView,
      navParams,
      data,
      carrito,
      apiLibros,
      apiLoading,
      apiError,
      token,
      navigate,
      doLogin,
      doSignup,
      doLogout,
      saveData,
      addColaborador,
      addCliente,
      updateColaborador,
      updateCliente,
      deleteColaborador,
      deleteCliente,
      approveColaborador,
      approveCliente,
      guardarPedidos,
      postAviso,
      getInitialData,
      fetchApiLibros,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
      favoritos,
      toggleFavorite,
      isFavorito,
      getFavoritos
    }}>
      {children}
    </DeporvidaContext.Provider>
  );
}

export function useDeporvida() {
  const context = useContext(DeporvidaContext);
  if (!context) {
    throw new Error('useDeporvida must be used within a DeporvidaProvider');
  }
  return context;
}