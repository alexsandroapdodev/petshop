import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://dtawpzvucvwcxbnwioat.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0YXdwenZ1Y3Z3Y3hibndpb2F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NTQ4MzgsImV4cCI6MjA2MjAzMDgzOH0.5BT6FbFJWZl9DyWbpGzCb-5-fx8ZJ1sWRjaavT4X658'
);

(async () => {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {

    window.location.href = 'index.html';
  }
})();

window.logout = async function () {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
};