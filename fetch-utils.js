const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUwODgwMywiZXhwIjoxOTU1MDg0ODAzfQ.J-wd3ZinAsWJOx74WAlDTfP_zlOPEuXkq5omF4WTAQk';

export async function getUser() {
    return client.auth.user();
}

export function checkLoggedIn() {
    if (!client.auth.session()) {
        window.location = '../';
    }
}

const SUPABASE_URL = 'https://wkltsapfnvvazzlbkpbz.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

export async function signUp(realEmail, realPassword) {
    console.log(client.auth.user());

    const response = await client.auth.signUp({
        email: realEmail,
        password: realPassword,
    });

    console.log(client.auth.user());

    return response.user;
}

export async function savePoll(question, option1, option2, votes1, votes2) {
    const response = await client
        .from('polls')
        .insert([{
            question,
            option_1: option1,
            votes_1: votes1,
            option_2: option2,
            votes_2: votes2,
        },
        ]);
    return response.data;
}

export async function getPolls() {
    const response = await client
        .from('polls')
        .select();

    return response.data;
}