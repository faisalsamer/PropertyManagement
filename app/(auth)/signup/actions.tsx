'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'


type signupProps = {
    formData: FormData
}

export const signup = async ({ formData }: signupProps): Promise<string> => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!
    const supabase = await createClient();

    const firstName = formData.get('firstName')?.toString();
    const lastName = formData.get('lastName')?.toString() || '';
    const username = formData.get('username')?.toString().toLowerCase();
    const email = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';

    // Add validation - early return if required fields are missing
    if (!email || !password || !username || !firstName) {
        return 'Missing required fields';
    }

    // 1️⃣ Sign up the user in Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username,
                first_name: firstName,
                last_name: lastName || ''
            },
            emailRedirectTo: `http://${siteUrl}/email-confirmation`
        }
    })

    if (signUpError || !data.user) {
        return signUpError?.message || 'Unknown signup error';
    }

    revalidatePath('/', 'layout');
    return 'success'; // ✅ Make sure this is always reached
};