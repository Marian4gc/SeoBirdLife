import { render, screen, fireEvent } from '@testing-library/react';
import Birds from './components/birds/Birds';
import Thanks from './components/thanks/Thanks'
import Song from './components/birds/Song';
import Home from './components/Home/Home';
import Insects from './components/insects/Insects';
import Login from './components/login/Login';




test('renders learn react link', () => {
  render(<Thanks />);
  const linkElement = screen.getByText(/Gracias/i);
  expect(linkElement).toBeInTheDocument();
});

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: 'success' }))
}));

test('renders learn react link', () => {
  render(<Birds />);
  const linkElement = screen.getByText(/Sigue la pista de las aves/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Birds without crashing', () => {
  render(<Birds />);
});

test('renders Song without crashing', () => {
  render(<Song />);
});

test('renders userlist without crashing', () => {
  render(<userList />);
});

test('renders Home without crashing', () => {
  render(<Home />);
});

test('renders Insect without crashing', () => {
  render(<Insects />);
});

test('renders Login without crashing', () => {
  render(<Login />);
});

test('renders a button Empezar', () => {
  const { getByText } = render(<button>Empezar</button>);
  const button = getByText('Empezar');
  expect(button).toBeInTheDocument();
});

test('renders a button Registrarse', () => {
  const { getByText } = render(<button>Registrarse</button>);
  const button = getByText('Registrarse');
  expect(button).toBeInTheDocument();
});

//comprobar que el login funciona correctamente simulando un login correcto y otro incorrecto
describe('Login', () => {
  test('successful login', async () => {
    // Mock successful login response
    const loginResponse = {
      data: {
        token: 'some-token'
      }
    };
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(loginResponse),
    });

    render(<Login />);

    // Fill out and submit login form
    fireEvent.change(screen.getByLabelText('Usuario'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'testpassword' } });
    fireEvent.click(screen.getByText('Entrar'));

    // Wait for success message to appear
    await screen.findByText('¡Bienvenid@, testuser!');

    // Ensure login details are stored in localStorage
    expect(window.localStorage.getItem('loggedAppUser')).toEqual('some-token');
    expect(JSON.parse(window.localStorage.getItem('name'))).toEqual({ username: 'testuser' });
    expect(window.localStorage.getItem('role')).toEqual('ROLE_USER');
  });

  test('unsuccessful login', async () => {
    // Mock unsuccessful login response
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error());

    render(<Login />);

    // Fill out and submit login form
    fireEvent.change(screen.getByLabelText('Usuario'), { target: { value: 'invaliduser' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'invalidpassword' } });
    fireEvent.click(screen.getByText('Entrar'));

    // Wait for error message to appear
    await screen.findByText('Comprueba si está bien escrito tu usuario y contraseña');

    // Ensure login details are not stored in localStorage
    expect(window.localStorage.getItem('loggedAppUser')).toBeNull();
    expect(window.localStorage.getItem('name')).toBeNull();
    expect(window.localStorage.getItem('role')).toBeNull();
  });
});