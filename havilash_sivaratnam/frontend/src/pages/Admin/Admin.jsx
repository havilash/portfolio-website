import React, { useEffect, useState } from 'react'
import UsersTable from 'src/components/UsersTable/UsersTable';

import './Admin.css';
import { useRedirectToLogin } from 'src/hooks/useSession';

export default function Admin({session}) {
    useRedirectToLogin(session, 2)

    return (
        <section className='section w-full min-h-screen flex justify-center items-center'>
            <UsersTable session={session} />
        </section>
    );
}
