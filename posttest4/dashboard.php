<?php
session_start();
if (!isset($_SESSION['username'])) {
    header("Location: login.php?pesan=belum_login");
    exit();
}
$username = $_SESSION['username'];
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Dashboard - Showroom Honda</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header><h2 style="text-align:center;">Dashboard Showroom Honda</h2></header>
<main style="text-align:center; margin-top:50px;">
<h3>Selamat Datang, <?php echo htmlspecialchars($username); ?> 👋</h3>
<p>Anda berhasil login ke dashboard Showroom Honda.</p>
<a href="index.php" class="btn btn-secondary">🏠 Kembali ke Beranda</a>
<a href="logout.php" class="btn btn-primary">🚪 Logout</a>
</main>
</body>
</html>
