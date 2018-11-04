<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="./timer/"></script>
</head>
<h1>Registration Successful</h1>
<p><b>Registrant information:</b></p>
<p><b>Date:</b> <?=$_GET['date']?>
<br><b>First Name:</b> <?=$_GET['first_name']?>
<br><b>Last Name:</b> <?=@$_GET['last_name']?> 
<br><b>Email:</b> <a href="mailto:<?=$_GET['email']?>"><?=$_GET['email']?></a> 
<br><b>EverWebinat ThankYou Url:</b> <a href="<?=$_GET['thank_you_url']?>"><?=$_GET['thank_you_url']?></a> 
<br><b>Time Remaining:</b> <span id="remainingtime"> ...</span> 

<script>
EverWebinar_Timer.init('#remainingtime');
</script>
<pre><?php 
print_r($_GET);
