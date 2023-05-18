<!DOCTYPE html>
<html>
    <head>
        <title>New Users Registered</title>
        <style>
            table {
                border-collapse: collapse;
                width: 100%;
            }
            th, td {
                text-align: left;
                padding: 8px;
            }
            tr:nth-child(even) {
                background-color: #f2f2f2;
            }
            @media screen and (max-width: 600px) {
                table, tr, td, th {
                    display: block;
                }
                tr {
                    margin-bottom: 10px;
                }
                td, th {
                    padding: 5px;
                }
            }
        </style>
    </head>
    <body>
        <h1>New Users Registered</h1>
        <p>Dear {{ $admin->name }},</p>
        <p>The following new users have registered on your personal portfolio website:</p>
        <table>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Comment</th>
                <th>Access</th>
            </tr>
            @foreach ($users as $user)
                <tr>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->email }}</td>
                    <td>{{ $user->comment }}</td>
                    <td>{{ $user->accessName() }}</td>
                </tr>
            @endforeach
        </table>

        <p>If you have any questions or concerns, please don't hesitate to contact me at <a href="mailto:{{ $admin->email }}">{{ $admin->email }}</a> or by phone at {{ $admin->phone }}.</p>

        <p>Best regards,</p>
        <p>Havilash Sivaratnam</p>
    </body>
</html>
