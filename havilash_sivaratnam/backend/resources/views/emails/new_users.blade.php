<!DOCTYPE html>
<html>
  <head>
    <title>New Users Registered</title>
    <style>
      table {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        grid-gap: 10px;
        border-collapse: collapse;
        width: 100%;
      }
      th,
      td {
        text-align: left;
        padding: 8px;
      }
      tr:nth-child(even) {
        background-color: #f2f2f2;
      }
    </style>
  </head>
  <body>
    <h1>New Users Registered</h1>
    <p>Dear {{ $admin->name }},</p>
    <p>The following new users have registered on your Havilash Sivaratnam's portfolio website:</p>
    <table>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Access</th>
      </tr>
      @foreach ($users as $user)
      <tr>
        <td>{{ $user->name }}</td>
        <td>{{ $user->email }}</td>
        <td>{{ $user->accessName() }}</td>
      </tr>
      @endforeach
    </table>
    <p>Best regards,</p>
    <p>Havilash Sivaratnam</p>
  </body>
</html>

