import { useDeporvida } from '../context/DeporvidaContext';
import { PublicLayout } from '../layouts/PublicLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { ColaboradorLayout } from '../layouts/ColaboradorLayout';
import { ClienteLayout } from '../layouts/ClienteLayout';
import '../styles/main.css';
import { HomeView } from './public/HomeView';
import { AboutView } from './public/AboutView';
import { ContactView } from './public/ContactView';
import { RoleClickView } from './public/RoleClickView';
import { SignupView } from './public/SignupView';
import { LoginView } from './public/LoginView';
import { CatalogoView } from './public/CatalogoView';
import { CarritoView } from './public/CarritoView';
import { CheckoutView } from './public/CheckoutView';
import { FavoritosView } from './public/FavoritosView';
import { AdminDashboardView } from './admin/AdminDashboardView';
import { AdminColaboradorMenuView } from './admin/AdminColaboradorMenuView';
import { AdminViewColaboradorView } from './admin/AdminViewColaboradorView';
import { AdminAddColaboradorView } from './admin/AdminAddColaboradorView';
import { AdminApproveColaboradorView } from './admin/AdminApproveColaboradorView';
import { AdminClienteMenuView } from './admin/AdminClienteMenuView';
import { AdminViewClienteView } from './admin/AdminViewClienteView';
import { AdminAddClienteView } from './admin/AdminAddClienteView';
import { AdminApproveClienteView } from './admin/AdminApproveClienteView';
import { AdminPedidosMenuView } from './admin/AdminPedidosMenuView';
import { AdminAvisosView } from './admin/AdminAvisosView';
import { AdminUpdateClienteView } from './admin/AdminUpdateClienteView';
import { AdminLibrosView } from './admin/AdminLibrosView';
import { ColaboradorDashboardView } from './colaborador/ColaboradorDashboardView';
import { ColaboradorPedidosMenuView } from './colaborador/ColaboradorPedidosMenuView';
import { ColaboradorRegistrarPedidoView } from './colaborador/ColaboradorRegistrarPedidoView';
import { ColaboradorAvisoView } from './colaborador/ColaboradorAvisoView';
import { ClienteDashboardView } from './cliente/ClienteDashboardView';
import { ClienteMisPedidosView } from './cliente/ClienteMisPedidosView';
import { ClienteVerPedidoView } from './cliente/ClienteVerPedidoView';

export function DeporvidaApp() {
  const { currentView, currentUser, navParams } = useDeporvida();

  const publicViews = [
    'home', 'about', 'contact', 'catalogo', 'carrito', 'checkout', 'favoritos',
    'admin-click', 'colaborador-click', 'cliente-click',
    'admin-signup', 'colaborador-signup', 'cliente-signup', 'login'
  ];

  const adminViews = [
    'admin-dashboard', 'admin-colaborador', 'admin-view-colaborador', 'admin-add-colaborador',
    'admin-approve-colaborador', 'admin-update-colaborador', 'admin-view-colaborador-salario',
    'admin-cliente', 'admin-view-cliente', 'admin-add-cliente', 'admin-approve-cliente',
    'admin-update-cliente', 'admin-view-cliente-compras',
    'admin-pedidos', 'admin-avisos', 'admin-libros',
    'admin-compras', 'admin-view-compras', 'admin-view-pedidos', 'admin-registrar-pedido',
  ];

  const colaboradorViews = [
    'colaborador-dashboard', 'colaborador-pedidos', 'colaborador-registrar-pedido', 'colaborador-avisos'
  ];

  const clienteViews = [
    'cliente-dashboard', 'cliente-pedidos', 'cliente-ver-pedido'
  ];

  // Public Layout
  if (publicViews.includes(currentView)) {
    return (
      <PublicLayout>
        {renderPublicView(currentView)}
      </PublicLayout>
    );
  }

  // Admin Layout
  if (adminViews.includes(currentView)) {
    return (
      <AdminLayout userName={currentUser?.firstName}>
        {renderAdminView(currentView)}
      </AdminLayout>
    );
  }

  // Colaborador Layout
  if (colaboradorViews.includes(currentView)) {
    return (
      <ColaboradorLayout userName={currentUser?.firstName}>
        {renderColaboradorView(currentView)}
      </ColaboradorLayout>
    );
  }

  // Cliente Layout
  if (clienteViews.includes(currentView)) {
    return (
      <ClienteLayout userName={currentUser?.firstName}>
        {renderClienteView(currentView)}
      </ClienteLayout>
    );
  }

  return <PublicLayout><HomeView /></PublicLayout>;

  function renderPublicView(view: string) {
    switch (view) {
      case 'home': return <HomeView />;
      case 'about': return <AboutView />;
      case 'contact': return <ContactView />;
      case 'catalogo': return <CatalogoView />;
      case 'carrito': return <CarritoView />;
      case 'checkout': return <CheckoutView />;
      case 'favoritos': return <FavoritosView />;
      case 'admin-click': return <RoleClickView role="Admin" roleKey="admin" color="#19b3d3" />;
      case 'colaborador-click': return <RoleClickView role="Colaborador" roleKey="colaborador" color="#2ed8b6" />;
      case 'cliente-click': return <RoleClickView role="Cliente" roleKey="cliente" color="#FFB64D" />;
      case 'admin-signup': return <SignupView role="admin" />;
      case 'colaborador-signup': return <SignupView role="colaborador" />;
      case 'cliente-signup': return <SignupView role="cliente" />;
      case 'login': return <LoginView />;
      default: return <HomeView />;
    }
  }

  function renderAdminView(view: string) {
    switch (view) {
      case 'admin-dashboard': return <AdminDashboardView />;
      case 'admin-colaborador': return <AdminColaboradorMenuView />;
      case 'admin-view-colaborador': return <AdminViewColaboradorView />;
      case 'admin-add-colaborador': return <AdminAddColaboradorView />;
      case 'admin-approve-colaborador': return <AdminApproveColaboradorView />;
      case 'admin-cliente': return <AdminClienteMenuView />;
      case 'admin-view-cliente': return <AdminViewClienteView />;
      case 'admin-add-cliente': return <AdminAddClienteView />;
      case 'admin-approve-cliente': return <AdminApproveClienteView />;
      case 'admin-pedidos': return <AdminPedidosMenuView />;
      case 'admin-avisos': return <AdminAvisosView />;
      case 'admin-update-cliente': return <AdminUpdateClienteView clienteId={navParams.id} />;
      case 'admin-libros': return <AdminLibrosView />;
      default: return <AdminDashboardView />;
    }
  }

  function renderColaboradorView(view: string) {
    switch (view) {
      case 'colaborador-dashboard': return <ColaboradorDashboardView />;
      case 'colaborador-pedidos': return <ColaboradorPedidosMenuView />;
      case 'colaborador-registrar-pedido': return <ColaboradorRegistrarPedidoView className={navParams.class} />;
      case 'colaborador-avisos': return <ColaboradorAvisoView />;
      default: return <ColaboradorDashboardView />;
    }
  }

  function renderClienteView(view: string) {
    switch (view) {
      case 'cliente-dashboard': return <ClienteDashboardView />;
      case 'cliente-pedidos': return <ClienteMisPedidosView />;
      case 'cliente-ver-pedido': return <ClienteVerPedidoView id={navParams.id} />;
      default: return <ClienteDashboardView />;
    }
  }
}