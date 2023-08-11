<?php
  $BACKEND_URL = getenv('BACKEND_URL');
  $GITHUB_TOKEN = getenv('GITHUB_TOKEN');
?>
<script>
  window.BACKEND_URL = '<?php echo $BACKEND_URL; ?>';
  window.GITHUB_TOKEN = '<?php echo $GITHUB_TOKEN; ?>';
</script>
