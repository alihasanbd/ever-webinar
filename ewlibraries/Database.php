<?php

use Kodeio\Database as Conn;
use Kodeio\Database\Table;

class Database
{
	private $db;
	
	public function __construct($table, $config)
	{
		$this->db = new Table($table, Conn::init(
			$config['host_name'], $config['db_user_name'], 
			$config['db_user_password'], $config['db_name'], 
			$config['db_port']
		));
	}
	
	public function addLead($fname, $lname, $email, $date, $tz, $wid, 
		$uid, $ty, $live, $replay, $schedule)
	{
		return $this->db->insert([
			'first_name' => $fname, 'last_name' => $lname,
			'email_address' => $email, 'webinar_date' => $date,
			'date_timezone' => $tz, 'webinar_id' => $wid,
			'user_id' => $uid, 'thankyou_url' => $ty,
			'liveroom_url' => $live, 'replyroom_url' => $replay,
			'schedule' => $schedule,
		]);
	}
}
