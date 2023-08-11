<?php
  $env = parse_ini_file('.env');
  $BACKEND_URL = $env['BACKEND_URL'];
  $GITHUB_TOKEN = $env['GITHUB_TOKEN'];
?>
<script>
  window.BACKEND_URL = '<?php echo $BACKEND_URL; ?>';
  window.GITHUB_TOKEN = '<?php echo $GITHUB_TOKEN; ?>';
</script>
