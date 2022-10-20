'use strict';

module.exports = function(grunt) {

	grunt.initConfig({

		openui5_preload: {
			component: {
				options: {
					resources: {
						cwd: 'webapp',
						prefix: 'MyUI5WebApp',
						src: [
							'**/*.js',
							'**/*.fragment.html',
							'**/*.fragment.json',
							'**/*.fragment.xml',
							'**/*.view.html',
							'**/*.view.json',
							'**/*.view.xml',
							'**/*.properties',
							'manifest.json',
							'!test/**'
						]
					},
					dest: 'webapp'
				},
				components: true
			}
		},

		copy: {
			main: {
			  files: [
				// includes files within path
				{expand: true, cwd: './webapp/controls/',src:['**'], dest: './dist'},

			  ],
			},
		  },

	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-openui5');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('build', ['copy']);


};
