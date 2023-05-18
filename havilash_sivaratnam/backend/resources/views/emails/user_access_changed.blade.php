<!DOCTYPE html>
<html>
    <head>
        <title>Your Access Rights Have Changed</title>
    </head>
    <body>
        <h1>Your Access Rights Have Changed</h1>
        <p>Dear {{ $user->name }},</p>
        <p>Your access rights on Havilash Sivaratnam's personal portfolio website have been updated. You now have the following access level: <strong>{{ $user->accessName() }}</strong>.</p>

        @switch($user->access)
            @case(App\Models\User::ACCESS_NORMAL)
                <p>As a user with <strong>Normal</strong> access, you have access to basic information such as Havilash's hobbies, skills, and career.</p>
                @break

            @case(App\Models\User::ACCESS_VERIFIED)
                <p>As a user with <strong>Verified</strong> access, you have access to Havilash's portfolio documents, including his report card, certificates, and CV.</p>
                @break

            @case(App\Models\User::ACCESS_ADMIN)
                <p>As a user with <strong>Admin</strong> access, you have full access to the website. You can update and delete users, create keys, and view all content.</p>
                @break
        @endswitch

        <p>If you have any questions or concerns, please don't hesitate to contact Havilash at <a href="mailto:havilash.sivaratnam@protonmail.com">havilash.sivaratnam@protonmail.com</a> or by phone at +49 77 954 20 22.</p>

        <p>Best regards,</p>
        <p>Havilash Sivaratnam</p>
    </body>
</html>
