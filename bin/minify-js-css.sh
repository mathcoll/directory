# PWA version
#uglifyjs \
#	../public/js/controller/Appshell.js \
#	../public/js/hash-router/hash-router.min.js \
#	-o ../public/js/directory.min.js \
#	-p 5 -m -c warnings=false
#echo PWA Javascript minify: Completed

uglifycss \
	../public/css/material.min.css \
	../public/css/inline.css \
	../public/css/material-dashboard/material-dashboard.min.2.1.0.css \
	> ../public/css/directory.min.css
echo PWA Stylesheet minify: Completed

