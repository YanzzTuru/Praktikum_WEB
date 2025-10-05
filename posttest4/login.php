<?php
session_start();

if (isset($_SESSION['username'])) {
    header("Location: dashboard.php");
    exit();
}

$error = '';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST['username'];
    $pass = $_POST['password'];

    if ($user === 'admin' && $pass === '12345') {
        $_SESSION['username'] = $user;
        header("Location: dashboard.php");
        exit();
    } else {
        $error = "Username atau password salah!";
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Login - Showroom Honda</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="simulasi-form" style="margin-top:100px;">
<h2>Login Admin</h2>
<?php
if (isset($_GET['pesan']) && $_GET['pesan'] == 'logout') echo "<p style='color:green;'>✅ Anda telah logout.</p>";
if (isset($_GET['pesan']) && $_GET['pesan'] == 'belum_login') echo "<p style='color:red;'>⚠️ Silakan login terlebih dahulu!</p>";
if ($error) echo "<p style='color:red;'>$error</p>";
?>
<form method="POST" action="login.php">
<label>Username</label>
<input type="text" name="username" required>
<label>Password</label>
<input type="password" name="password" required>
<button type="submit" class="btn btn-primary">Login</button>
</form>
</div>
</body>
</html>
