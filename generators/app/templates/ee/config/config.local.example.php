<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Local config overrides & db credentials
 *
 * Our database credentials and any environment-specific overrides
 * This file should be specific to each developer and not tracked in Git
 *
 * @package    Focus Lab Master Config
 * @version    1.1.1
 * @author     Focus Lab, LLC <dev@focuslabllc.com>
 */


// Local db
$env_db['hostname'] = 'localhost';
$env_db['username'] = '';
$env_db['password'] = '';
$env_db['database'] = '';

/**
 * Remote db - typically a shared development database
 *
 * Putting this below the local settings allows us to easily uncomment the
 * lines to connect to a secondary connection, overriding the first settings
 */
// $env_db['hostname'] = 'domain.com';
// $env_db['username'] = '';
// $env_db['password'] = '';
// $env_db['database'] = '';

//For debugging any emails EE sends setup a mailtrap account and put the settings here
//$env_config['mail_protocol'] = 'smtp';
//$env_config['smtp_server'] = 'mailtrap.io';
//$env_config['smtp_port'] = '2525';
//$env_config['smtp_username'] = '';
//$env_config['smtp_password'] = '';

$env_global['global:ga'] = "UA-XXXXXXXX-X";
$env_global['global:per_page'] = 3;

// Local testing email address
$env_config['webmaster_email'] = 'me@domain.com';


/* End of file config.local.php */
/* Location: ./config/config.local.php */
