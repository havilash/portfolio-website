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
    <p>The following new users have registered on Havilash Sivaratnam's portfolio website:</p>
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

    <p>You can access Havilash Sivaratnam's portfolio website by clicking <a href="{{ $portfolioUrl }}">here</a> ({{ $portfolioUrl }}).</p>

    <p>Best regards,</p>
    <p>Havilash Sivaratnam</p>

    
    <br><br>
    <hr>
    <div style="font-size: 14px; font-family: Arial;">
        Havilash Sivaratnam<br>
        Bachstrasse 2<br>
        3072 Ostermundigen<br>
        +41 77 954 20 22<br>
        havilash.sivaratnam@protonmail.com<br>
        <a href="https://havilash.com">havilash.com</a>
    </div>
  </body>
</html>
