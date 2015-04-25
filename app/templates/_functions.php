<?php
	
	/*
	 * Enable menus
	 */
	add_theme_support( 'menus' );

	function register_theme_menus() {

		register_nav_menus(
			array(
				'primary-menu' => __( 'Primary Menu' )
			)
		);

	}
	add_action( 'init', 'register_theme_menus' );

	/*
	 * Loads styles and scripts
	 */
	function wpt_theme_styles() {
	    wp_enqueue_style( 'main_css', get_template_directory_uri() . '/css/main.css' );
	}
	add_action( 'wp_enqueue_scripts', 'wpt_theme_styles' );

	/**
	 * Add jQuery
	 */
	function add_jquery_script() {
	    wp_deregister_script( 'jquery' );
	    wp_register_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js');
	    wp_enqueue_script( 'jquery' );
	} 

	add_action('wp_enqueue_scripts', 'add_jquery_script');

	function wpt_theme_js() {
	    wp_enqueue_script( 'modernizr_js', get_template_directory_uri() . '/js/modernizr.js', '', '', false );
	    wp_enqueue_script( 'plugins_js', get_template_directory_uri() . '/js/plugins.min.js', array('jquery'), '', true );
	    wp_enqueue_script( 'main_js', get_template_directory_uri() . '/js/app.js', array('jquery', 'plugins_js'), '', true );
	}
	add_action('wp_enqueue_scripts', 'wpt_theme_js');
	
	
	/*
	 * Allow WP to make title tag dynamic
	 */
	add_theme_support( 'title-tag' );
	
	
	/*
	 * Allow category page to show custom post types
	 */
	function namespace_add_custom_types( $query ) {
    if( is_category() || is_tag() && empty( $query->query_vars['suppress_filters'] ) ) {
	        $post_types = get_post_types( '', 'names' ); 
	        $query->set( 'post_type', $post_types);
	        return $query;
	    }
	}
	add_filter( 'pre_get_posts', 'namespace_add_custom_types');
	
	
	/*
	 * Allow post thumbnails
	 */
	add_theme_support('post-thumbnails');
	function setup_types() {
	    register_post_type('mytype', array(
	        'label' => __('My type'),
	        'supports' => array( 'title', 'editor', 'thumbnail', 'revisions' ),
	        'show_ui' => true,
	    ));
	}
	add_action('init', 'setup_types');
	
	add_image_size( 'autosize', 104, 9999, false );
	
	

	
	
?>