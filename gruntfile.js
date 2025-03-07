module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/** \n* Package: <%= pkg.name %> - version <%= pkg.version %> \n* Author: <%= pkg.author %> \n* Build Time: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>  \n*/\n',
		uglify: {
			build: {
				files: [{
					cwd: 'src/js',
					expand: true,
					src: ['*.js'],
					dest: 'dist/includes/js/',
					ext: '.min.js'
				}]
			}
		}, //close uglify
		csslint: {
			options: {
				"import": 2,
				"important": false,
				"ids": false,
				"adjoining-classes": false,
				"qualified-headings": false,
				"overqualified-elements": false,
				"unique-headings": false,
				"duplicate-background-images": false,
				"compatible-vendor-prefixes": false,
				"gradients": false
			}, // close .options
			build: {
				src: ['src/css/*.css']
			} // close .build
		}, // close csslint
		cssmin: {
			build: {
				files: [{
					cwd: 'src/css',
					expand: true,
					src: ['*.css'],
					dest: 'dist/includes/css/',
					ext: '.min.css'
				}]
			}, // close .build
		}, // close cssmin
		less: {
			build: {
				files: [{
					cwd: 'src/less',
					expand: true,
					src: ['*.less'],
					dest: 'src/css/',
					ext: '.css'
				}]
			}, // close .build
		}, // close less
		jade: {
			compile: {
			options: {
				pretty: true
			},
			files: [{
				expand: true,
				cwd: 'src/views/',
				src: [ '**/*.jade','!layout.jade' ],
				dest: 'dist',
				ext: '.html'
			}]
		  }
		},
		watch: {
			js: {
				files: 'src/js/*.js',
				tasks: ['uglify'],
				options: {
					interrupt: true,
				},
			},
			css: {
				files: 'src/less/*.less',
				tasks: ['less','cssmin','usebanner'],
				options: {
					interrupt: true,
				},
			},
			jade: {
				files: 'src/views/*.jade',
				tasks: ['jade'],
				options: {
					interrupt: true,
				},
			},
		},

		usebanner: {
	    js_css: {
	      options: {
	        position: 'top',
	        banner: '<%= banner %>',
	        linebreak: true
	      },
	      files: {
	        src: [ 'dist/includes/css/offcanvas-nav.min.css', 'dist/includes/js/offcanvas-nav.min.js' ]
	      }
	    }
	  }
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-banner');

	// Default task(s).
	grunt.registerTask('default', ['devbuild', 'watch']);
	grunt.registerTask('devbuild', ['uglify','less','csslint','cssmin','jade','usebanner']);

	// grunt.event.on('watch', function(action, filepath, target) {
	// 	grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	// });

};
