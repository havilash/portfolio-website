<!DOCTYPE html>
<html>
    <head>
        <title>Your Access Rights Have Changed</title>
    </head>
    <body>
        <h1>Your Access Rights Have Changed</h1>
        <p>Dear {{ $user->name }},</p>
        <p>Your access rights on Havilash Sivaratnam's portfolio website have been updated. You now have the following access level: <strong>{{ $user->accessName() }}</strong>.</p>

        @switch($user->access)
            @case(App\Models\User::ACCESS_NORMAL)
                <p>As a user with <strong>Normal</strong> access, you have access to basic information such as Havilash's hobbies, skills, and career.</p>
                @break

            @case(App\Models\User::ACCESS_VERIFIED)
                <p>As a user with <strong>Verified</strong> access, you have access to Havilash's portfolio documents, including his report cards, certificates, and CV.</p>
                @break

            @case(App\Models\User::ACCESS_ADMIN)
                <p>As a user with <strong>Admin</strong> access, you have full access to the website. You can update and delete users, create keys, and view all content.</p>
                @break
        @endswitch

        <p>You can access Havilash Sivaratnam's portfolio website by clicking <a href="{{ $portfolioUrl }}">here</a> ({{ $portfolioUrl }}).</p>

        <p>If you have any questions or concerns, please don't hesitate to contact Havilash at <a href="mailto:havilash.sivaratnam@protonmail.com">havilash.sivaratnam@protonmail.com</a>.</p>

        <p>Please do not reply to this email as it is an automatic email.</p>

        <p>Best regards,</p>
        <p>Havilash Sivaratnam</p>

        <br>
        <hr>
        <div style="font-size: 14px; font-family: Arial;">
            Havilash Sivaratnam<br>
            Bachstrasse 2<br>
            3072 Ostermundigen<br>
            Tel.: +41 77 954 20 22<br>
            havilash.sivaratnam@protonmail.com<br>
            <a href="https://havilash.com">https://havilash.com</a>
        </div>
        </body>
</html>
