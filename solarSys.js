//'use scrict';


//some notes first we need to put all of the javascript into its own seperate file then call that in index
            //index will act as our main
            //then, we need to put everything in our javascript file into functions
            //so far this is what I think needs to happen
            //
            //put all of the camera work into the init function.
            //second, make a function that can load textures
            //third, make a function that can load up planets
            //fourth, make a function that can load up moons
            //fifth, make a function that positions and makes the planets move in an orbit
            //sixth do the same with the moons
            //this to do list should be all finished by may 17th 
            //bonus host all of this on a secure server.

            //The constants that we're using
function main(){
            const astroUnit = 30; //how far the earth is from the sun
            const earthRad = 1; //the radius of the earth
            const moonRad = 0.2; //the radius of luna, earth's moon.

            //first make an array of planet objects
            /*
            *finally was able to clean up all the data and store them all into a class
            *June 18th 2019
            *notes on improvement:
            - Find out if I can seperate the files properly
            - Find out if I can make a class file in javascript
            - Also now I can add in different camera angles
            - I want to be able to shift orbits to whatever I'm clicking on



            */
            class PlanetData{
                constructor(planetName,planetRadius,orbitalRadius,orbitRate,xpos,ypos,zpos){
                    this.planetName = planetName;
                    this.planetRadius = planetRadius;
                    this.orbitalRadius = orbitalRadius;
                    this.orbitRate = orbitRate;
                    this.xpos = xpos;
                    this.ypos = ypos;
                    this.zpos = zpos;
                }

                get getplanetName(){
                    return this._planetName;
                }
                get getplanetRadius(){
                    return this._planetRadius;
                }
                get getorbitalRadius(){
                    return this._orbitalRadius;

                }
                get getorbitRate(){
                    return this._orbitRate;
                }
                get getxpos(){
                    return this._xpos;
                }
                get getypos(){
                    return this._ypos;
                }
                get getzpos(){
                    return this._zpos;
                }
                set planetName(planetName){
                    this._planetName = planetName;
                }

                set planetRadius(planetRadius){
                    this._planetRadius = planetRadius;
                }

                set orbitalRadius(orbitalRadius){
                    this._orbitalRadius = orbitalRadius;
                }

                set orbitRate(orbitRate){
                    this._orbitRate = orbitRate;
                }
                set xpos(xpos){
                    this._xpos = xpos;
                }
                set ypos(ypos){
                    this._ypos = ypos;
                }
                set zpos(zpos){
                    this._zpos = zpos;
                }


            }


            //This array holds all the basic information for every planet in the solar system
            //use this array for the functions that need planetary data
            var planetDataArray = [new PlanetData("mercury",0.45*earthRad,0.39*astroUnit,88,0.45*earthRad,0,0),
            new PlanetData("venus",0.95*earthRad,0.723*astroUnit,225,0.45*earthRad,0,0),
            new PlanetData("earth",earthRad,astroUnit,365,earthRad,0,0),
            new PlanetData("mars",0.48*earthRad,1.524*astroUnit,687,0.45*earthRad,0,0),
            new PlanetData("jupiter",2*earthRad,5.203*astroUnit,4380,0.45*earthRad,0,0),
            new PlanetData("saturn",1.7*earthRad,9.529*astroUnit,10585,0.45*earthRad,0,0),
            new PlanetData("uranus",1.4*earthRad,19.18*astroUnit,30660,0.45*earthRad,0,0),
            new PlanetData("neptune",1.4*earthRad,30.06*astroUnit,60225,0.45*earthRad,0,0)
        ];

   

            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera ( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

            var renderer = new THREE.WebGLRenderer( );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );
            window.addEventListener('resize',function()
            {
                var width = window.innerWidth;
                var height = window.innerHeight;
                renderer.setSize(width,height);
                camera.aspect = width/height; //seems he created the method WITHIN the call
                camera.updateProjectionMatrix( );

            })



            //this code will detect when the user resizes the window
            //and then adjust the rendered shapes accordingly
            controls = new THREE.OrbitControls(camera,renderer.domElement);
            //this is how the user will pan around the camera
            //so let's see if we can load up earth's img
           
           function textLoader(image)
         	{
         		texture = new THREE.TextureLoader().load(image);
         		return texture;
         	}


          //this function creates a generic sphere object and puts on the planet texture, making the final planet
         	function createPlanet(image,radius,widSeg,heiSeg)
         	{ //the basic function to create a planet 
         		texture = textLoader(image);
         		var geometry = new THREE.SphereGeometry(radius,widSeg,heiSeg);
         		var material = new THREE.MeshPhongMaterial({map: texture});
         		var planet = new THREE.Mesh(geometry,material);
         		return planet;
         	}


             //this function is basically the same as the create planet function 
            function createMoon(image,radius,widSeg,heiSeg){

                texture = textLoader(image);
                var geometry = new THREE.SphereGeometry(radius,widSeg,heiSeg);
                var material = new THREE.MeshPhongMaterial({map: texture});
                var moon = new THREE.Mesh(geometry,material);
                return moon;
            }

         	//creating all the planets in the solar system in order from distance to the sun 
         	//perhaps make an array and store all the data there?
         	/****************************************************************************************
         	/*date:May 18th,2019 I've made the following progress to the solar system project:
         	1) i've made all eight planets
         		- I distanced each planet according to the number of AU they are from the sun
         		- I made their sizes according to their relative ratios to earth
         		- I also added their textures
         	2) I've made standard functions for loading textures, moving planets and making planet objects
         	3) I've also got the sun and correct lighting





         	 ******************************************************************************************/


         	mercury = createPlanet('img/2k_mercury.jpg',planetDataArray[0].getplanetRadius,32,32);
         	venus = createPlanet('img/2k_venus_atmosphere.jpg',planetDataArray[1].getplanetRadius,32,32);
         	earth = createPlanet('img/earthmap.jpg',planetDataArray[2].getplanetRadius,32,32);
         	mars = createPlanet('img/2k_mars.jpg',planetDataArray[3].getplanetRadius,32,32);
         	jupiter = createPlanet('img/2k_jupiter.jpg',planetDataArray[4].getplanetRadius,32,32);
         	saturn = createPlanet('img/2k_saturn.jpg',planetDataArray[5].getplanetRadius,32,32);
         	uranus = createPlanet('img/2k_uranus.jpg',planetDataArray[6].getplanetRadius,32,32);
         	neptune = createPlanet('img/2k_neptune.jpg',planetDataArray[7].getplanetRadius,32,32);


            var planets = [mercury,venus,earth,mars,jupiter,saturn,uranus,neptune];


            //making the moons
            earthMoon = createMoon('img/2k_moon.jpg',moonRad,32,32);



         	//position the planets according to how many AUs they are away from the sun
         	mercury.position.x = planetDataArray[0].getxpos;
         	venus.position.x = planetDataArray[1].getxpos;
         	earth.position.x = planetDataArray[2].getxpos;//1 AU is now 25. 
         	mars.position.x = planetDataArray[3].getxpos;
         	jupiter.position.x = planetDataArray[4].getxpos;
         	saturn.position.x = planetDataArray[5].getxpos;
         	uranus.position.x = planetDataArray[6].getxpos;
         	neptune.position.x = planetDataArray[7].getxpos;
            earthMoon.position.x = planetDataArray[2].getxpos + 0.2*astroUnit;


         	//Add the final product to the scene
         	scene.add(mercury);
         	scene.add(venus);
            scene.add(earth);
            scene.add(mars);
            scene.add(jupiter);
            scene.add(saturn);
            scene.add(uranus);
            scene.add(neptune);
            scene.add(earthMoon);

         
            camera.position.z = 10;
            //make a function to create the orbits of the planets, it takes the their relative position to the sun and 
            //moves it according to the formula for radial velocity.
           function movePlanet(myPlanet, orbitRate, myTime,distanceFromAxis,orbitData) {

           		myPlanet.rotation.y += 0.015;
    		
      			  myPlanet.position.x = Math.cos(myTime 
                * (1.0 / (orbitRate * orbitData)) + 10.0) 
                * distanceFromAxis;
       			 myPlanet.position.z = Math.sin(myTime 
                * (1.0 / (orbitRate * orbitData)) + 10.0) 
                * distanceFromAxis;
    
            }

            //this is similar to the movePlanet function except that i need to take into account that the moon is orbiting around the planet
            function moveMoon(myMoon,myPlanet, orbitRate, myTime,distanceFromAxis,orbitData){
                //first find a way to get the moon around the planet 
                movePlanet(myMoon,orbitRate,myTime,distanceFromAxis,orbitData);
                myMoon.position.x = myMoon.position.x + myPlanet.position.x;
                myMoon.position.z = myMoon.position.z + myPlanet.position.z;





            }

            
            //add another thing, when clicking on a planet or star to switch cameras and therefore controls
            //to make the sun I made a sphere geometry then coupled the position of the light with the position of the sphere

            //code to make the sun itself. 
            //the goal is to make a very very bright star to look at, some things I anticipate i'll need are shaders
            //glows and 
            //make the sun out of mesh basic with point light then put an ambient light there too
            var Sgeometry = new THREE.SphereGeometry(7,32,32);
            var Smaterial = new THREE.MeshBasicMaterial({map: textLoader('img/2k_sun.jpg')});
            var star = new THREE.Mesh(Sgeometry,Smaterial);

            sun = star;

             var starLight = new THREE.PointLight(0xffffffff,3,0,0); //basics are up i have a dimg white ball and a stationary earth. need a waay brighter ball, a non stationary earth
             var sunLightemit = new THREE.AmbientLight(0xffffffff,2);
             starLight.position.set(sun.position.x,sun.position.y,sun.position.z);
             starLight.castShadow = true;


		
             scene.add(starLight);
             scene.add(sun);

             //the process should go like this:
             /*
             *User should be able to click on a planet
             *Once the user clicks on the planet the camera should go to that planet's location
             *The use should be able to zoom in and out like normal, so stay in orbit controls
             *The user should be able to pan back to their original position ie. the sun
             *
             *What I think the code will be like:
             * - LISTEN for the click event
             * - IF something was clicked, check where it intersects
             * - IF the intersect is on a planet move the camera position there
             * - ELSE ignore
             * 
             */
             //Code added to calculate the movement and position of the mouse
             var raycaster = new THREE.Raycaster();
			 var mouse = new THREE.Vector2();

             function onMouseDown (event){

                 mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1; 
                 mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1; 
             }




			var starsGeometry = new THREE.Geometry();

			for ( var i = 0; i < 10000; i ++ ) {

			var star = new THREE.Vector3();
			star.x = THREE.Math.randFloatSpread( 2000 );
			star.y = THREE.Math.randFloatSpread( 2000 );
			star.z = THREE.Math.randFloatSpread( 2000 );

			starsGeometry.vertices.push( star );

			}

			var starsMaterial = new THREE.PointsMaterial( { color: 0x888888 } );

			var starField = new THREE.Points( starsGeometry, starsMaterial );

			scene.add( starField );






          


            // game logic
            var update = function( )
            {
            	var time = Date.now();
            	movePlanet(mercury,planetDataArray[0].getorbitRate,time,planetDataArray[0].getorbitalRadius,200);
            	movePlanet(venus,planetDataArray[1].getorbitRate,time,planetDataArray[1].getorbitalRadius,200);
            	movePlanet(earth,planetDataArray[2].getorbitRate,time,planetDataArray[2].getorbitalRadius,200);
            	movePlanet(mars,planetDataArray[3].getorbitRate,time,planetDataArray[3].getorbitalRadius,200);
            	movePlanet(jupiter,planetDataArray[4].getorbitRate,time,planetDataArray[4].getorbitalRadius,200);
            	movePlanet(saturn,planetDataArray[5].getorbitRate,time,planetDataArray[5].getorbitalRadius,200);
            	movePlanet(uranus,planetDataArray[6].getorbitRate,time,planetDataArray[6].getorbitalRadius,200);
            	movePlanet(neptune,planetDataArray[7].getorbitRate,time,planetDataArray[7].getorbitalRadius,200);



                moveMoon(earthMoon,earth,30,time,2.8,200);


            };


            window.addEventListener('mousedown',onMouseDown,false);//what about mouse up? 
            // draw Scene
            var render = function( )
            {
                

            raycaster.setFromCamera(mouse,camera);
            var intersectedObjs = raycaster.intersectObjects(scene.children); //get the location of where the mouse clicked

            if(intersectedObjs.length > 0){
            //intersectedObjs[0].point;
            //console.log(intersectedObjs[0].point);
            intersectX = intersectedObjs[0].point.getComponent(0);
            intersectY = intersectedObjs[0].point.getComponent(1);
            intersectZ = intersectedObjs[0].point.getComponent(2);


            for(i = 0;i<planets.length;i++){
            //camera.position.set(intersectX,intersectY,intersectZ); //kind of works? 
            if(intersectX < (planets[i].position.x + planetDataArray[i].getplanetRadius) && intersectX > (planets[i].position.x - planetDataArray[i].getplanetRadius)){
                controls.target.set(planets[i].position.x,planets[i].position.y,planets[i].position.z);
                controls.update();
            } //basic raycasting complete
            else if(intersectX > (planets[i].position.x + planetDataArray[i].getplanetRadius) && intersectX < (planets[i].position.x - planetDataArray[i].getplanetRadius)){
               // camera.position.set(0,0,0);
                controls.target.set(0,0,0);
                controls.update();




            }
            //improvements animation of closeup
            // a reset button back to the sun
            // making sure the camera follows the planet's orbit
            }










            }






               
              renderer.render( scene, camera );
            };
            
            // run game loop (update, render, repeat)
            var GameLoop = function( ) //this is the equivalent of update 
            {

                requestAnimationFrame( GameLoop );

                update( );
                render( );
            };


            GameLoop( );
        }
        main();
