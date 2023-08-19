<!DOCTYPE html>
<html>
  <head>
    <title>New User Registered</title>
  </head>
  <body>
    <h1>New User Registered</h1>
    <p>Dear {{ $admin->name }},</p>
    <p>A new user has registered on Havilash Sivaratnam's portfolio website:</p>
    <ul>
      <li>Name: {{ $user->name }}</li>
      <li>Email: {{ $user->email }}</li>
      <li>Comment: {{ $user->comment }}</li>
      <li>Access: {{ $user->accessName() }}</li>
    </ul>

    <p>You can access Havilash Sivaratnam's portfolio website by clicking <a href="{{ $portfolioUrl }}">here</a> ({{ $portfolioUrl }}).</p>

    <p>Please do not reply to this email as it is an automatic email.</p>

    <p>Best regards,</p>
    <p>Havilash Sivaratnam</p>

    
    <br><br>
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
