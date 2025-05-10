import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';


const supabaseUrl = 'https://dtawpzvucvwcxbnwioat.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0YXdwenZ1Y3Z3Y3hibndpb2F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NTQ4MzgsImV4cCI6MjA2MjAzMDgzOH0.5BT6FbFJWZl9DyWbpGzCb-5-fx8ZJ1sWRjaavT4X658'; // Use a chave pública (anon)

const supabase = createClient(supabaseUrl, supabaseKey);

const signupForm = document.getElementById('signup-form');

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = signupForm.email.value;
    const password = signupForm.password.value;
    const confirmPassword = signupForm['confirm-password'].value;

    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
  });

    if (error) {
      console.error('Erro ao registrar:', error.message);
      alert(`Erro: ${error.message}`);
    } else {
      console.log('Usuário registrado com sucesso:', data);
      const signupMessage = document.getElementById('signup-message');
      signupMessage.style.display = 'block';

    }


    if (data.user) {
      const userId = data.user.id;

      const { error: insertError } = await supabase.from('profiles').insert([
        {
          id: userId,
          created_at: new Date().toISOString(),
          email: email
        }
      ]);

      if (insertError) {
        console.error('Erro ao salvar na tabela profiles:', insertError.message);
        alert(`Erro ao salvar: ${insertError.message}`);
        return;
      }


    }
  });
}

const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
  });

    if (error) {
      console.error('Erro ao fazer login:', error.message);
      alert(`Erro: ${error.message}`);
    } else {
      console.log('Login bem-sucedido:', data);
      window.location.href = 'home.html';
    }
  });
}

const forgotPasswordLink = document.getElementById('forgot-password-link');

if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = prompt("Digite seu e-mail para redefinir a senha:");
    if (!email) return;

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: '/reset-password.html' // URL para onde o usuário será redirecionado
    });

    if (error) {
      console.error('Erro ao solicitar redefinição de senha:', error.message);
      alert(`Erro: ${error.message}`);
    } else {
      alert('E-mail de redefinição de senha enviado com sucesso!');
    }
  });
}