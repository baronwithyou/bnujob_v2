/*
 * 	easyAccordion 0.1 - jQuery plugin
 *	written by Andrea Cima Serniotti	
 *	http://www.madeincima.eu
 *
 *	Copyright (c) 2010 Andrea Cima Serniotti (http://www.madeincima.eu)
 *	Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
 *	Built for jQuery library http://jquery.com
 */
 
(function(jQuery) {
	jQuery.fn.easyAccordion = function(options) {
	
	var defaults = {			
		slideNum: true,
		autoStart: false,
		slideInterval: 3000
	};
			
	this.each(function() {
		
		var settings = jQuery.extend(defaults, options);		
		jQuery(this).find('dl').addClass('easy-accordion');
		
		
		// -------- Set the variables ------------------------------------------------------------------------------
		
		jQuery.fn.setVariables = function() {
			dlWidth = jQuery(this).width();
			dlHeight = jQuery(this).height();
			dtWidth = jQuery(this).find('dt').outerHeight();
			if (jQuery.browser.msie){ dtWidth = $(this).find('dt').outerWidth();}
			dtHeight = dlHeight - (jQu