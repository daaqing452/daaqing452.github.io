var str_computer_graphics = "\
	<h1> Computer Graphics </h1> \
	<h2> Transformation </h2> \
	<h3> Homogeneous Coordinate </h3> \
	<p>3D Point: \\( (x,y,z,1)^\\top \\) </p> \
	<p>3D Vector: \\( (x,y,z,0)^\\top \\) </p> \
	<p> Vector \\( \\pm \\) Vector \\( = \\) Vector </p> \
	<p> Point \\( \\pm \\) Vector \\( = \\) Point </p> \
	<p> Point \\( - \\) Point \\( = \\) Vector </p> \
	<p> Point \\( + \\) Point \\( = \\) ? &emsp;&emsp; \\( (x,y,z,w)^\\top = (x/w,y/w,z/w,1)^\\top \\) </p> \
	<h3> Basic Linear Transformation </h3> \
	<table> \
		<tr> \
			<td class='table_padding20'> Translation: </td> \
			<td> \\( {\\bf T} (t_x,t_y,t_z) = \\begin{bmatrix} \
				1 &   &   & t_x \\\\ \
				  & 1 &   & t_y \\\\ \
	 			  &   & 1 & t_z \\\\ \
	 			  &   &   &  1       \
			\\end{bmatrix} \\) </td> \
			<td></td> \
		</tr> <tr> \
			<td> Rotation: </td> \
			<td class='table_padding20'> \\( {\\bf R}_x(\\theta) = \\begin{bmatrix} \
				1 &                &                 & \\\\ \
				  & \\cos{\\theta} & -\\sin{\\theta} & \\\\ \
				  & \\sin{\\theta} &  \\cos{\\theta} & \\\\ \
				  &                &                 & 1    \
			\\end{bmatrix} \\) </td> \
			<td> \\( {\\bf R}(-\\theta) = {\\bf R}(\\theta)^{-1} = {\\bf R}(\\theta)^\\top \\) </td> \
		</tr> <tr> \
			<td> Scaling: </td> \
			<td> \\( {\\bf S}(s_x,s_y,s_z) = \\begin{bmatrix} \
				s_x &     &     &   \\\\ \
				    & s_y &     &   \\\\ \
				    &     & s_z &   \\\\ \
				    &     &     & 1      \
			\\end{bmatrix} \\) </td> \
			<td></td> \
		</tr> <tr> \
			<td> Shear: </td> \
			<td> \\( \\begin{bmatrix} \
				1 & a &   &   \\\\ \
				  & 1 &   &   \\\\ \
				  &   & 1 &   \\\\ \
				  &   &   & 1      \
			\\end{bmatrix} \\) </td> \
			<td></td> \
		</tr> \
	</table> \
	<h3> Affine Transformation </h3> \
	\\( \\begin{bmatrix} \
		a & b & c & t_x \\\\ \
		d & e & f & t_y \\\\ \
		g & h & i & t_z \\\\ \
		  &   &   & 1        \
	\\end{bmatrix} \\) \
	<h3> Euler Angle </h3> \
	<p> Order: Z (Roll) → X (Pitch) → Y (Yaw) </p> \
	<p> Gimbal Lock: mapping of Euler angles to rotations is \\( n \\) to \\( 1 \\) </p> \
	<p> Quaternion: \\( (x,y,z,w) \\) used for linear interpolation </p> \
	<h4> Rodrigues' Rotation Formula </h4> \
	<p> Rotation by angle \\( \\alpha \\) around axis \\( {\\bf n} \\) </p> \
	\\( {\\bf R}({\\bf n},\\alpha) = \\cos(\\alpha){\\bf I} + (1-\\cos(\\alpha)){\\bf nn}^\\top + \\sin{\\alpha} \\begin{bmatrix} \
		     & -n_z &  n_y \\\\ \
		 n_z &      & -n_x \\\\ \
		-n_y &  n_x &           \
	\\end{bmatrix} \\) \
	<h3> Viewing Transformation </h3> \
	<p> Transform camera to its original transformation, and the world moves correspondingly to keeps the same relative transformation </p> \
	<table> \
		<tr> \
			<td class='table_padding20'> Position: </td> \
			<td class='table_padding20'> \\( {\\bf t}=(t_x,t_y,t_z) \\) </td> \
			<td class='table_padding20'> → </td> \
			<td> \\( (0,0,0) \\) </td> \
		</tr> <tr> \
			<td> Forward: </td> \
			<td> \\( {\\bf f}=(f_x,f_y,f_z) \\) </td> \
			<td> → </td> \
			<td> -Z Axis </td> \
		</td> <tr> \
			<td> Upward: </td> \
			<td> \\( {\\bf u}={u_x,u_y,u_z} \\) </td> \
			<td> → </td> \
			<td> Y Axis </td> \
		</tr> \
	</table> \
	<ul> \
		<li> <p> Translate camera to origin: </p> \
		\\( {\\bf T}_{\\rm view} = \\begin{bmatrix} \
			1 &   &   & -t_x \\\\ \
			  & 1 &   & -t_y \\\\ \
			  &   & 1 & -t_z \\\\ \
			  &   &   & 1         \
		\\end{bmatrix} \\) </li> \
		<li> <p> Get inversed matrix of rotation </p> \
		\\( {\\bf R}_{\\rm view}^{-1} = \\begin{bmatrix} \
			({\\bf f} \\times {\\bf u})_x & u_x & -f_x &   \\\\ \
			({\\bf f} \\times {\\bf u})_y & u_y & -f_y &   \\\\ \
			({\\bf f} \\times {\\bf u})_z & u_z & -f_z &   \\\\ \
										  &     &      & 1      \
		\\end{bmatrix} \\) </li> \
		<li> <p> Get viewing transformation matrix </p> \
		\\( {\\bf M}_{\\rm view} = {\\bf R}_{\\rm view}{\\bf T}_{\\rm view} = ({\\bf R}_{\\rm view}^{-1})^\\top{\\bf T}_{\\rm view} \\) </li> \
	</ul> \
	<h3> Orthographic Projection </h3> \
	<p> Camera goes to origin, drop Z coordinate, translate and scale image to \\( [-1,1]^2 \\) </p> \
	<img width='150px' src='note_files/computer_graphics/orthographic_projection.png'/> \
	<p> Generally, map the cuboid \\( [l,r]\\times[b,t]\\times[f,n] \\) to a canonical cube \\( [-1,1]^3 \\) </p> \
	\\( {\\bf M}_{\\rm ortho} = {\\bf S}_{\\rm ortho}{\\bf T}_{\\rm ortho} = \\begin{bmatrix} \
		\\frac{2}{r-l} &                &                &   \\\\ \
		               & \\frac{2}{t-b} &                &   \\\\ \
		               &                & \\frac{2}{n-f} &   \\\\ \
		               &                &                & 1      \
	\\end{bmatrix} \\begin{bmatrix} \
		1 &   &   & -\\frac{r+l}{2} \\\\ \
		  & 1 &   & -\\frac{t+b}{2} \\\\ \
		  &   & 1 & -\\frac{n+f}{2} \\\\ \
		  &   &   & 1                    \
	\\end{bmatrix} \\) \
	<p> <a href='#_Field_of_View_(FOV)_'> Field-of-View (FOV) </a>: sometimes prefer vertical FOV (fovY) </p> \
	<p> <b> Aspect ratio </b> = width / height </p> \
	<h3> Perspective Projection </h3> \
	<p>Transform the frustum (perspective projection) to the cuboid (orthographic projection) </p> \
	<img width='400px' src='note_files/computer_graphics/perspective_projection.png'/> \
	<p> \\( {\\bf M}_{\\rm persp} = {\\bf M}_{\\rm ortho}{\\bf M}_{\\rm persp\\rightarrow ortho} \\) </p> \
	<p> \\( {\\bf M}_{\\rm persp} \\begin{bmatrix} \
		x \\\\ y \\\\ z \\\\ 1 \
	\\end{bmatrix} = \\begin{bmatrix} \
		nx/z \\\\ ny/z \\\\ {\\rm unknown} \\\\ 1 \
	\\end{bmatrix} = \\begin{bmatrix} \
		nx \\\\ ny \\\\ {\\rm unknown} \\\\ z \
	\\end{bmatrix} \\) </p> \
	<p> By consider immobile points \\( (0,0,n) \\) and \\( (0,0,f) \\), get unknown coefficients </p> \
	<p> \\( {\\bf M}_{\\rm persp\\rightarrow ortho} = \\begin{bmatrix} \
		n &   &     &     \\\\ \
		  & n &     &     \\\\ \
		  &   & n+f & -nf \\\\ \
		  &   & 1   &          \
	\\end{bmatrix} \\) </p> \
	<h2> Rasterization </h2> \
	<p> Break up polygons into triangles, and draw projected triangles on screen and set pixel values </p> \
	<h3> <span class='badge badge-secondary' style='font-weight:normal'>[Basic]</span> Convolution Theorem </h3> \
	<p> Convolution in spatial domain = Multiplication in frequency domain </p> \
	<p> Convolution in frequency domain = Multiplication in spatial domain </p> \
	<h3> <span class='badge badge-secondary' style='font-weight:normal'>[Basic]</span> Sampling </h3> \
	<p> Sampling = repeat frequency contents </p> \
	<img width='500px' src='note_files/computer_graphics/sampling_0.png'/> \
	<p> Aliasing = mixed frequency contents </p> \
	<img width='500px' src='note_files/computer_graphics/sampling_1.png'/> \
	<h3> Anti-Aliasing </h3> \
	<ul> \
		<li> Increase sampling rate </li> \
		<li> Blurring or Pre-Filtering (filtering our high frequencies) before sampling </li> \
	</ul> \
	<img width='400px' src='note_files/computer_graphics/anti-aliasing.png'/> \
	<h3> Super-Sampling (MSAA) </h3> \
	<p> Sampling multiple location within a pixel and averaging their values </p> \
	<img width='400px' src='note_files/computer_graphics/super-sampling.png'/> \
	<p> Other milestones: </p> \
	<ul> \
		<li> FXAA (Fast Approximate AA) </li> \
		<li> TAA (Temporal AA) </li> \
		<li> DLSS (Deep Learning Super-Sampling) </li> \
	</ul> \
	<h3> Z-Buffer </h3> \
	<p> Store current minimum Z-value for each sample (pixel) </p> \
	<ol> \
		<li> Frame buffer stores color values </li> \
		<li> Depth buffer (Z-buffer) stores depth </li> \
	</ol> \
	<h3> Shadow Mapping </h3> \
	<p> Two passes: </p> \
	<ol> \
		<li> Pass 1: get depth image from light source (shadow map, Z-buffer of light source) </li> \
		<li> Pass 2A: standard image (with depth) from eye </li> \
		<li> Pass 2B: project visible points in eye view back to light source </li> \
		<li> Compare distance from light source of each point with the depth of corresponding pixel in shadow map: if not match, the point is in shadow </li> \
	</ol> \
	<img width='150px' src='note_files/computer_graphics/shadow_mapping.png'/> \
	<p> Problems: </p> \
	<ul> \
		<li> Hard shadows (point light only) </li> \
		<li> Quality depends on shadow map resolution </li> \
		<li> Involves equality comparison of floating-point depth values means issues of scale, bias, tolerance </li> \
	</ul> \
	<h2> Shading </h2> \
	<h3> Graphics (Real-time Rendering) Pipeline </h3> \
	<img width='500px' src='note_files/computer_graphics/graphics_pipeline.png'/> \
	<h3> Blinn-Phong Reflectance Model </h3> \
	<img width='200px' src='note_files/computer_graphics/blinn-phong.png'/> \
	<p> \\( \\begin{align} L_{\\rm diffuse} & = k_{\\rm diffuse}\\frac{I}{r^2}\\max(0,{\\bf n}\\cdot{\\bf l}) \\\\ \
	L_{\\rm specular} & = k_{\\rm specular}\\frac{I}{r^2}\\max(0,{\\bf n}\\cdot{\\bf h})^p \\\\ \
	L_{\\rm ambient} & = k_{\\rm ambient}I_{\\rm ambient} \\\\ \
	L & = L_{\\rm diffuse} + L_{\\rm specular} + L_{\\rm ambient} \\end{align} \\) </p> \
	<p> Notation: </p> \
	<p> \\( L \\): reflected light </p> \
	<p> \\( k,p \\): coefficients </p> \
	<p> \\( \\frac{I}{r^2} \\): the energy arrived at the shading point (intensity / (distance from the light source)<sup>2</sup>) </p> \
	<p> \\( {\\bf h} = \\frac{{\\bf v}+{\\bf l}}{||{\\bf v}+{\\bf l}||} \\): the bisector of \\( {\\bf v} \\) and \\( {\\bf l} \\) </p> \
	<h3> Shading Models </h3> \
	<table> \
		<tr> \
			<td> <b>Flat</b> shading: </td> \
			<td> shade each triangle </td> \
		</tr> <tr> \
			<td class='table_padding20'> <b>Gouraud</b> shading: </td> \
			<td> shade each vertex </td> \
		</tr> <tr> \
			<td> <b>Phong</b> shading: </td> \
			<td> shade each fragment (e.g., pixel) </td> \
		</tr> \
	</table> \
	<h3> Interpolation of Vertex Normal Vector </h3> \
	<p> Average surrounding faces' normal vectors </p> \
	<p> $$ {\\bf N}_v = \\frac{\\sum_i{{\\bf N}_i}}{||\\sum_i{{\\bf N}_i}||} \\hspace{100cm} $$ </p> \
	<img width='200px' src='note_files/computer_graphics/interpolation_of_normal.png'/> \
	<h3> Barycentric Coordinate </h3> \
	<p> A coordinate system \\( (\\alpha,\\beta,\\gamma) \\) for triangles </p> \
	<img width='200px' src='note_files/computer_graphics/barycentric_coordinate.png'/> \
	<p> \\( P=\\alpha A + \\beta B + \\gamma C \\) </p> \
	<p> \\( \\alpha+\\beta+\\gamma=1, \\alpha\\ge 0, \\beta\\ge 0, \\gamma\\ge 0 \\) </p> \
	<p> Only work triangles in 3D space, not equals to work for 3D triangles in a 2D raster screen </p> \
	<p> \\( \\begin{align} \
		\\alpha &=\\frac{A_A}{A_A+A_B+A_C}=\\frac{(P-B)\\times(C-B)}{(A-B)\\times(C-B)} \\\\ \
		\\beta &=\\frac{A_B}{A_A+A_B+A_C}=\\frac{(P-C)\\times(A-C)}{(B-C)\\times(A-C)} \\\\ \
		\\gamma &=\\frac{A_C}{A_A+A_B+A_C}=1-\\alpha-\\beta \
	\\end{align} \\) </p> \
	<h2> Texture </h2> \
	<p> Get texture coordinate \\( (u,v) \\) of a point, and sample \\( (u,v) \\) on the texture </p> \
	<h3> Texture Magnification Problems </h3> \
	<p> <b>Texel</b>: a pixel on a texture </p> \
	<ul> \
		<li> Jaggies (Oversampling): Texture is too small <ul> \
			<li> Bilinear Interpolation </li> \
			<li> Bicubic Interpolation </li> </ul> \
		</li> \
		<li> Moiré Pattern (Undersampling): A pixel covers a range of texels <ul> \
			<li> Mipmap </li> \
			<li> Anisotropic Filtering </li> </ul> \
		</li> \
	</ul> \
	<h3> Bilinear Interpolation </h3> \
	<img width='150px' src='note_files/computer_graphics/bilinear_interpolation.png'/> \
	<p> \\( {\\rm Lerp}(x,v_0,v_1)=v_0+x(v_1-v_0) \\) </p> \
	<p> \\( f(x,y)={\\rm Lerp}(s,{\\rm Lerp}(t,u_{00},u_{01}), {\\rm Lerp}(t,u_{10},u_{11})) \\) </p> \
	<h3> MipMap </h3> \
	<p> Allowing fast, approximate and square range queries </p> \
	<ul> \
		<li> Additional storage: 1/3 </li> \
		<li> Limitation: overblur </li> \
	</ul> \
	<img width='500px' src='note_files/computer_graphics/mipmap.png'/> \
	<ol> \
		<li> Pre-store a hierarchy of different levels of raw images </li> \
		<li> Estimate texture coordinates \\( (u,v) \\) of neighboring screen samples \\( a_i \\) </li> \
		<li> <p> Computing mipmap level by the size of required range </p> \
		<p> $$ D=\\log_2{\\left\(\\max_{a_i}{\\sqrt{\\left\(\\frac{{\\rm d}u}{{\\rm d}a_i}\\right\)^2+\\left\(\\frac{{\\rm d}v}{{\\rm d}a_i}\\right\)^2}}\\right\)} \\hspace{100cm} $$ </p> </li> \
		<li> <p> Query the texel in level \\( D \\) by bilinear interpolation </p> \
		<p> <b>Trilinear Interpolation</b>: Linear interpolation based on bilinear results of level \\( D \\) and \\( D+1 \\) </p> </li> \
	</ol> \
	<h3> Anisotropic Filtering </h3> \
	<p> Ripmap: axis-aligned rectangle zones </p> \
	<ul> \
		<li> Additional storage: 3x </li> \
		<li> Limitation: diagonal zones </li> \
	</ul> \
	<img width='200px' src='note_files/computer_graphics/anisotropic_filtering.png'/> \
	<h3> EWA Filtering </h3> \
	<p> Multiple lookups, weighted average </p> \
	<img width='150px' src='note_files/computer_graphics/ewa_filtering.png'/> \
	<h3> Environment Mapping </h3> \
	<p> Map environment lighting into a texture (light from different directions) </p> \
	<ul> \
		<li> Spherical map </li> \
		<li> Cube map (6 faces): bounding box of a sphere; the light from the sphere hit the cube face </li> \
	</ul> \
	<h3> Bump/Normal Mapping </h3> \
	<p> Fake the detailed geometry without adding more triangles </p> \
	<p> Perturb surface normal per pixel (for shading computation only) by height shift per texel defined by a texture </p> \
	<ol> \
		<li> Original surface normal \\( {\\bf n_p}=(0,0,1) \\) </li> \
		<li> <p> Derivatives at \\( {\\bf p} \\) are </p> \
		<p> $$ \\frac{{\\rm d}{\\bf p}}{{\\rm d}u}=c_1(h(u+1)-h(u)) \\hspace{100cm} $$ </p> \
		<p> $$ \\frac{{\\rm d}{\\bf p}}{{\\rm d}v}=c_1(h(v+1)-h(v)) \\hspace{100cm} $$ </p> </li> \
		<li> <p> Perturbed normal is </p> \
		<p> $$ {\\bf n}=\\left\(-\\frac{{\\rm d}⁡{\\bf p}}{{\\rm d}⁡u} ,-\\frac{{\\rm d}⁡{\\bf p}}{{\\rm d}⁡v},1\\right\).{\\rm normalized} \\hspace{100cm} $$ </li> \
	</ol> \
	<img width='300px' src='note_files/computer_graphics/bump_mapping.png'/> \
	<h3> Displacement Mapping </h3> \
	<p> Use the same texture as in bump mapping </p> \
	<p> Actually moves the heights of vertices (need triangles to be small enough) </p> \
	<h3> 3D Procedural Noise + Solid Modeling </h3> \
	<p> 3D texture generated by 3D function </p> \
	<p> Complex noise function can generate 3D texture: maintains, water, ... </p> \
	<p> e.g., Perlin noise </p> \
	<h3> Ambient Occlusion Texture Map </h3> \
	<p> Precomputed shadow map (0-1), then multiply simple shading to generate ambient occlusion </p> \
	<h2> Geometry </h2> \
	<h3> Implicit Representation of Geometry </h3> \
	<p> Based on classify points – points satisfy some specified relationship </p> \
	<p> -&emsp;Hard to get all points on the surface </p> \
	<p> -&emsp;Easy to test points inside/outside/distance the surface </p> \
	<ul> \
		<li> Algebraic Surface: e.g., for point \\( (x,y,z) \\) where \\( f(x,y,z)=0 \\) </li> \
		<li> <p> Constructive Solid Geometry: combine implicit geometry via Boolean operations </p> \
		<img width='500px' src='note_files/computer_graphics/implicit_geometry.png'/> </li> \
		<li> Signed Distance Function: given minimum distance (+/-) from anywhere to object; good for blending </li> \
		<li> Fractals: exhibit self-similarity, detail at all scales </li> \
	</ul> \
	<h3> Explicit Representation of Geometry </h3> \
	<p> All points are given directly or via parameter mapping </p> \
	<p> -&emsp;Easy to get all points on the surface </p> \
	<p> -&emsp;Hard to test points inside/outside/distance the surface </p> \
	<ul> \
		<li> Point Cloud: list of points </li> \
		<li> Polygon Mesh: store vertexes & polygons (often triangles or quads) </li> \
		<li> Parameter Mapping: e.g., given points \\( (u,v) \\) and \\( f:{\\mathbb R}^2\\rightarrow {\\mathbb R}^3 \\), can enumerate all points \\( (u,v)\\rightarrow(x,y,z) \\) ) \
	</ul> \
	<h3> Bézier Curve </h3> \
	<img width='500px' src='note_files/computer_graphics/bezier_curve.png'/> \
	<h4> de Casteljau Algorithm </h4> \
	<p> Recursively lerp control points </p> \
	$$ {\\bf b}^n(t)=\\sum_{j=0}^n{{\\bf b}_jB_j^n(t)} \\hspace{100cm} $$ \
	<p> Notation: </p> \
	<p> \\( {\\bf b}^n(t) \\): Bézier curve of order \\(n\\) </p> \
	<p> \\( {\\bf b}_j \\): Bézier control points </p> \
	<p> \\( B_j^n(t) = \\begin{pmatrix} n \\\\ i \\end{pmatrix}t^i(1-t)^{n-i} \\): Bernstein polynomials </p> \
	<h4> Properties of Cubic Bézier </h4> \
	<ul> \
		<li> Interpolates endpoints: \\( {\\bf b}(0)={\\bf b}_0, {\\bf b}(1)={\\bf b}_3 \\) </li> \
		<li> Tangent to end segments: \\( {\\bf b}^{'}(0)=3({\\bf b}_1-{\\bf b}_0), {\\bf b}^{'}(1)=3({\\bf b}_3-{\\bf b}_2) \\) </li> \
		<li> Affine transformation remains the same </li> \
		<li> Curve is within convex hull of control points </li> \
	</ul> \
	<h3> Piecewise Bézier Curves </h3> \
	<p> Higher-order Bézier curve not remain details, instead, chain many low-order Bézier curves </p> \
	<p> Piecewise cubic Bézier: the most common technique </p> \
	<img width='300px' src='note_files/computer_graphics/piecewise_bezier_curve.png'/> \
	<p> C<sup>0</sup> and C<sup>1</sup> continuity: \\( {\\bf b}_{0,3}={\\bf b}_{1,0}=\\frac{1}{2}\\left\({\\bf b}_{0,2}+{\\bf b}_{1,1}\\right\) \\) </p> \
	<h3> Splines </h3> \
	<p> A continuous curve constructed so as to pass through a given set of points and have a certain number of continuous derivatives </p> \
	<p> <b> B-splines </b>: basis splines </p> \
	<p> <b> NURBS </b> </p> \
	<h3> Bézier Surface </h3> \
	<p> Bicubic Bézier Surface Patch: 4×4 </p> \
	<img width='400px' src='note_files/computer_graphics/bezier_surface.png'/> \
	<p> \\((u,v)\\)-separable  application of de Casteljau algorithm </p> \
	<ol> \
		<li> Use de Casteljau to evaluate point u on each of the 4 Bezier curves. This gives 4 secondary control points </li> \
		<li> Use de Casteljau to evaluate point v on the \"moving\" curve </li> \
	</ol> \
	<h3> Loop Mesh Subdivision </h3> \
	<p> Common subdivision rule for triangle meshes </p> \
	<ol> \
		<li> <p> Split each triangle into four </p> \
		<img width='200px' src='note_files/computer_graphics/loop_mesh_subdivision_0.png'/> </li> \
		<li> <p> Update positions of vertices </p> \
		<table> \
			<tr> \
				<td> -&emsp;For new vertices: </td> \
				<td> \\( {\\bf P}=\\frac{3}{8}({\\bf A}+{\\bf B})+\\frac{1}{8}({\\bf C}+{\\bf D}) \\) </td> \
			</tr> <tr> \
				<td class='table_padding20'> -&emsp;For old vertices: </td> \
				<td> \\( {\\bf P}=(1-{\\rm deg}({\\bf P})*u){\\bf P}+u*\\sum{{\\rm neighbor}({\\bf P})} \\) </td> \
			</tr> \
		</table> \
		<p> where \\( u=\\begin{cases} \\frac{3}{16} & \\text{if deg(${\\bf P}$)=3} \\\\ \\frac{3}{8{\\rm deg}({\\bf P})} & \\text{otherwise} \\end{cases} \\) </p> \
		<img height='80px' src='note_files/computer_graphics/loop_mesh_subdivision_1.png'/>&emsp; \
		<img height='80px' src='note_files/computer_graphics/loop_mesh_subdivision_2.png'/> \
	</ol> \
	<h3> Catmull-Clark Mesh Subdivision </h3> \
	<img width='400px' src='note_files/computer_graphics/catmull-clark_0.png'/> </li> \
	<p> Subdivision for general mesh </p> \
	<ol> \
		<li> <p> Add vertex in each face, add midpoint on each edge, connect all new vertices </p> \
		<p> For each non-quad face, it will be subdivided into quad faces </p> </li> \
		<li> <p> Update positions of vertices </p> \
		<table> \
			<tr> \
				<td> For face point: </td> \
				<td> \\( f=\\frac{v_1+v_2+v_3+v_4}{4} \\) </td> \
			</tr> <tr> \
				<td> For edge point: </td> \
				<td> \\( e=\\frac{v_1+v_2+f_1+f_2}{4} \\) </td> \
			</tr> <tr> \
				<td class='table_padding20'> For vertex point (old): </td> \
				<td> \\( v=\\frac{f_1+f_2+f_3+f_4+2(e_1+e_2+e_3+e_4)+4v}{16} \\) </td> \
 			</tr> \
		</table> \
	</ol> \
	<img width='80px' src='note_files/computer_graphics/catmull-clark_1.png'/> &emsp;&emsp; \
	<img width='100px' src='note_files/computer_graphics/catmull-clark_2.png'/> &emsp;&emsp; \
	<img width='100px' src='note_files/computer_graphics/catmull-clark_3.png'/> \
	<h3> Collapsing Edges Mesh Simplification </h3> \
	<img width='400px' src='note_files/computer_graphics/collapsing_edge.png'/> \
	<p> <b>Quadric Error Metric</b>: New vertex should minimize its sum of square distance (L2 distance) to previously related triangle planes </p> \
	<p> Iteratively collapse edges with greedy algorithm: </p> \
	<ol> \
		<li> Approximate distance to surface as sum of distances to planes containing triangles </li> \
		<li> Collapse edge with smallest score </li> \
		<li> Maintain priority queue </li> \
	</ol> \
	<h2> Ray Tracing </h2> \
	<p> Rasterization can only handle rays with no more than one reflection; ray tracing is for more realistic rendering </p> \
	<h3> Whitted-Style (Recursive) Ray Tracing </h3> \
	<img width='500px' src='note_files/computer_graphics/whitted-style.png'/> \
	<ul> \
		<li> Always perform specular reflections / refractions </li> \
		<li> Stop bouncing at diffuse surface </li> \
	</ul> \
	<h3> Ray Intersection with Plane </h3> \
	<p> Ray Equation: \\( {\\bf r}(t)={\\bf O}+t{\\bf D} \\) </p> \
	<p> Plane Equation: \\( {\\bf p}: ({\\bf p}-{\\bf P}^{'})\\cdot{\\bf N}=0 \\), where \\( {\\bf P}^{'} \\) is any point on the plane </p> \
	$$ t=\\frac{({\\bf P}^{'}-{\\bf O})\\cdot{\\bf N}}{{\\bf D}\\cdot{\\bf N}} \\hspace{100cm} $$ \
	<h4> Möller Trumbore Algorithm </h4> \
	<p> Fast approach, giving barycentric coordinate directly </p> \
	$$ {\\bf O}+t{\\bf D}=(1-b_1-b_2){\\bf P}_0+b_1{\\bf P}_1+b_2{\\bf P}_2 \\hspace{100cm} $$ \
	$$ \\begin{bmatrix} t \\\\ b_1 \\\\ b_2 \\end{bmatrix} = \\frac{1}{{\\bf S}_1\\cdot{\\bf E}_1} \\begin{bmatrix} {\\bf S}_2\\cdot{\\bf E}_2 \\\\ {\\bf S}_1\\cdot{\\bf S} \\\\ {\\bf S}_2\\cdot{\\bf D} \\end{bmatrix} \\hspace{100cm} $$ \
	<p> where \\( {\\bf E}_i={\\bf P}_i-{\\bf P}_0 \\),&ensp; \\( {\\bf S}={\\bf O}-{\\bf P}_0 \\),&ensp; \\( {\\bf S}_1={\\bf D}\\times{\\bf E_2} \\),&ensp; \\( {\\bf S}_2={\\bf S}\\times{\\bf E_1} \\) </p> \
	<p> Check ray intersects triangle: \\( t,b_1,b_2,1-b_1-b_2>0 \\) </p> \
	<h3> Axis-Aligned Bounding Box (AABB) </h3> \
	<p> Any side of the bounding box is along either x, y, z axis </p> \
	<p> Box is the intersection of 3 pairs of slabs (left/right + front/back + top/bottom) </p> \
	<p> Slab intersection: \\( t=\\frac{{\\bf P}_x^{'}-{\\bf O}_x}{{\\bf D}_x} \\) </p> \
	<p> Ray-AABB intersection: </p> \
	<ol> \
		<li> Computer intersections with slabs: \\(t_{\\rm min}\\) and \\(t_{\\rm max}\\) </li> \
		<li> For 3D box, \\( t_{\\rm enter}=\\max⁡{\\\{t_{\\rm min}\\\}}, t_{\\rm exit}=\\min⁡{\\\{t_{\\rm max}\\\}} \\) </li> \
		<li> Ray and AABB intersect if and only if \\( t_{\\rm enter}&lt; t_{\\rm exit} \\) and \\( t_{\\rm exit}\\ge 0 \\) </li> \
	</ol> \
	<h3> Uniform Spatial Partition (Grid) </h3> \
	<ol> \
		<li> <p> Find bounding box, create grid </p> \
		<p> #cells = C * #objects; C≈27 in 3D </p> </li> \
		<li> Store each object in overlapping cells </li> \
		<li> Step through grid in ray traversal order </li> \
	</ol> \
	<img width='200px' src='note_files/computer_graphics/uniform_spatial_partition.png'/> \
	<h3> KD-Tree (Spatial Partition) </h3> \
	<ol> \
		<li> Find bounding box </li> \
		<li> Recursively split parent AABB along x-, y-, or z-axis (alternatively) by a split coordinate </li> \
		<li> Stop when the node is simple enough (leaf) </li> \
		<li> Objects only stored in leaf nodes </li> \
		<li> Ray query: from root; if ray hits AABB of the node, return the closer hit (from two children or stored objects); if not, ignore the node and its children </li> \
	</ol> \
	<img width='300px' src='note_files/computer_graphics/kd-tree.png'/> \
	<p> Problems: </p> \
	<ul> \
		<li> One object can be within multiple leaves </li> \
		<li> Test intersection between objects and node AABBs is not easy </li> \
	</ul> \
	<h3> Bounding Volume Hierarchy (BVH, Object Partition) </h3> \
	<ol> \
		<li> Find bounding box </li> \
		<li> Recursively split set of objects in two subsets along one axis </li> \
		<li> Recompute the bounding box of the subsets </li> \
		<li> Stop when the node is simple enough (leaf) </li> \
		<li> Objects only stored in leaf nodes </li> \
		<li> Ray query: same as KD-Tree </li> \
	</ol> \
	<img width='400px' src='note_files/computer_graphics/bvh.png'/> \
	<p> Heuristic: </p> \
	<ul> \
		<li> Always choose the longest axis in node </li> \
		<li> Split node at location of median object (\\( {\\rm O}(n) \\) find medium) </li> \
		<li> Stop when node contains few elements (e.g., 5) </li> \
	</ul> \
	<h3> <span class='badge badge-secondary' style='font-weight:normal'>[Basic]</span> Radiometry </h3> \
	<p> Measurement system and units for illumination; perform lighting calculations in a physically correct manner </p> \
	<table cellpadding='5px'> \
		<tr style='border-bottom: 1px solid #000000; border-top: 1px solid #000000'> \
			<td> <b> Name </b> </td> \
			<td> <b> Description </b> </td> \
			<td> <b> Symbol </b> </td> \
			<td> <b> Unit </b> </td> \
		</tr> <tr bgcolor='#eeeeee'> \
			<td> Radiant Energy </td> \
			<td> Energy of electromagnetic radiation </td> \
			<td> \\( Q \\) </td> \
			<td> \\( \\left\[ \\text{J=Joule} \\right\] \\) </td> \
		</tr> <tr> \
			<td> Radiant Flux (Power) </td> \
			<td> <p> Energy emitted or received per unit time </p> \
			<p> #photons flowing through a sensor in unit time </p> </td> \
			<td> \\( \\Phi\\equiv\\frac{{\\rm d}Q}{{\\rm d}t} \\) </td> \
			<td> <p> \\( \\left\[ \\text{W=Watt} \\right\] \\) </p> \
			<p> \\( \\left\[ \\text{lm=lumen} \\right\] \\) </p> </td> \
		</tr> <tr bgcolor='#eeeeee'> \
			<td> Angle </td> \
			<td> <p> Ratio of subtended arc length on circle to radius </p> \
			<p> Circle has \\( 2\\pi \\) radians </p> </td> \
			<td> \\( \\theta=\\frac{l}{r} \\) </td> \
			<td> \\( \\left\[ \\text{radian} \\right\] \\) </td> \
		</tr> <tr> \
			<td> Solid Angle </td> \
			<td> <p> Radio of subtended area on sphere to radius squared </p> \
			<p> Sphere has \\( 4\\pi \\) steradians </p> </td> \
			<td> \\( \\omega=\\frac{A}{r^2} \\) </td> \
			<td> \\( \\left\[ \\text{steradian} \\right\] \\) </td> \
		</tr> <tr bgcolor='#eeeeee'> \
			<td> Radiant Intensity </td> \
			<td> Power per unit solid angle </td> \
			<td> <p> \\( I(\\omega)\\equiv\\frac{{\\rm d}\\Phi}{{\\rm d}\\omega} \\) </p> \
			<p> \\( I=\\frac{\\Phi}{4\\pi} \\) </p> </td> \
			<td> <p> \\( \\left\[ \\frac{\\text{W}}{\\text{sr}} \\right\] \\) </p> \
			<p> \\( \\left\[ \\frac{\\text{lm}}{\\text{sr}}=\\text{cd}=\\text{candela} \\right\] \\) </p> </td> \
		</tr> <tr> \
			<td> Irradiance </td> \
			<td> <p> Power per unit area </p> \
			<p> Irradiance at a surface is proportional to cosine of angle between light direction and surface normal </p> \
			<p> \\( \\cos{\\theta}={\\bf n}\\cdot{\\bf l} \\) </p> </td> \
			<td> <p> \\( E(p)=\\frac{{\\rm d}\\Phi(p)}{{\\rm d}A} \\) </p> \
			<p> \\( E=\\frac{\\Phi}{A}\\cos{\\theta} \\) </p> </td> \
			<td> <p> \\( \\left\[ \\frac{\\text{W}}{\\text{m}^2} \\right\] \\) </p> \
			<p> \\( \\left\[ \\frac{\\text{lm}}{\\text{m}^2}=\\text{lux} \\right\] \\) </p> </td> \
		</tr> <tr bgcolor='#eeeeee' style='border-bottom: 1px solid #000000;'> \
			<td> Radiance </td> \
			<td> Power per unit solid angle per projected unit area </td> \
			<td> \\( L(p,\\omega)=\\frac{{\\rm d}^2\\Phi(p,\\omega)}{{\\rm d}\\omega\\\ {\\rm d}A\\cos{\\theta}} \\) </td> \
			<td> <p> \\( \\left\[ \\frac{\\text{W}}{\\text{sr}\\\ \\text{m}^2} \\right\] \\) </p> \
			<p> \\( \\left\[ \\frac{\\text{cd}}{\\text{m}^2}=\\frac{\\text{lm}}{\\text{sr}\\\ \\text{m}^2}=\\text{nit} \\right\] \\) </p> </td> \
		</tr> \
	</table> \
	<h4> Solid Angle Equations </h4> \
	$$ \\begin{align} {\\rm d}A &= (r\\\ {\\rm d}\\theta)(r\\sin{\\theta}\\\ {\\rm d}\\phi)=r^2\\sin{\\theta}\\\ {\\rm d}\\theta\\\ {\\rm d}\\phi \\\\ \
	{\\rm}d\\omega &= \\frac{{\\rm d}A}{r^2}=\\sin{\\theta}\\\ {\\rm d}\\theta\\\ {\\rm d}\\phi \\\\ \
	\\Omega &= \\int_{S^2}{{\\rm d}\\omega}=\\int_0^{2\\pi}{\\int_{0}^{\\pi}{\\sin{\\theta}\\\ {\\rm d}\\theta\\\ {\\rm d}\\phi}} = 4\\pi \
	\\end{align} \\hspace{100cm} $$ \
	<img width='250px' src='note_files/computer_graphics/radiometry.png'/> \
	<h4> Irradiance vs. Radiance </h4> \
	<table> \
		<tr> \
			<td> Irradiance: </td> \
			<td> total power received by area \\( {\\rm d}A \\) </td> \
		<tr/> <tr> \
			<td class='table_padding20'> Radiance: </td> \
			<td> total power received by area \\( {\\rm d}A \\) from \"direction\" \\( {\\rm d}\\omega \\) </td> \
		</tr> \
	</table> \
	$$ \\begin{align} {\\rm d}E(p,\\omega) &= L_i(p,\\omega)\\cos{\\theta}\\\ {\\rm d}\\omega \\\\ \
	E(p) &= \\int_{H^2}{L_i(p,\\omega)\\cos{\\theta}\\\ {\\rm d}\\omega} \\end{align} \\hspace{100cm} $$ \
	<p> where \\( H^2 \\) is unit hemisphere <p> \
	<h3> Bidirectional Reflectance Distribution Function (BRDF) </h3> \
	<img width='300px' src='note_files/computer_graphics/brdf.png'/> \
	<p> Radiance from direction \\( \\omega_i \\) turns into the power \\(E\\) that \\( {\\rm d}A \\) receives, then will become the radiance to any other direction \\( \\omega_r \\) </p> \
	$$ L_r(p,\\omega_r)=\\int_{H^2}{f_r(p,\\omega_i\\rightarrow\\omega_r)L_i(p,\\omega_i)\\cos{\\theta_i}\\\ {\\rm d}\\omega_i} \\hspace{100cm} $$ \
	<p> <b>BRDF</b>: </p> \
	$$ f_r(\\omega_i\\rightarrow\\omega_r)=\\frac{{\\rm d}L_r(\\omega_r)}{{\\rm d}E_i(\\omega_i)}=\\frac{{\\rm d}L_r(\\omega_r)}{L_i(\\omega_i)\\cos{\\theta_i}\\\ {\\rm d}\\omega_i} &emsp; \\left\[ \\frac{1}{\\text{sr}} \\right\] \\hspace{100cm} $$ \
	<p> Properties: </p> \
	<ul> \
		<li> Non-negativity: \\( f_r(\\omega_i\\rightarrow\\omega_r)\\ge 0 \\) </li> \
		<li> Linearity: BRDF can be split and compute then sum together </li> \
		<li> Reciprocity principle: \\( f_r(\\omega_r\\rightarrow\\omega_i)=f_r(\\omega_i\\rightarrow\\omega_r) \\) </li> \
		<li> Energy conservation: \\( \\forall\\omega_r, \\int_{H^2}{f_r(\\omega_i\\rightarrow\\omega_r)\\cos{\\theta_i}\\\ {\\rm d}\\omega_i}\\le 1 \\) </li> \
	</ul> \
	<p> <b>BTDF</b>: Bidirectional Transmition Distribution function </p> \
	<p> <b>BSDF</b>: Bidirectional Scatter Distribution Function (BRDF + BTDF) </p> \
	<h3> The Rendering Equation </h3> \
	$$ L_o(x,\\omega_o)=L_e(x,\\omega_o)+\\int_{\\Omega^+}{L_i(x,\\omega_i)f_r(x,\\omega_i,\\omega_o)({\\bf n}\\cdot\\omega_i){\\rm d}\\omega_i} \\hspace{100cm} $$ \
	<p class='script10 script_under_formula'> <span>Reflected light</span> <span style='margin-left:22px'>Emission</span> <span style='margin-left:72px'>Input light</span> <span style='margin-left:40px'>BRDF</span> <span style='margin-left:23px'>Input angle</span> </p> \
	<p> where \\( L_i(p,\\omega_i) \\) can be light source or reflected light from other objects \\( L_o(x, -\\omega_i) \\) \
	<p> Fredholm Integral Equation of second kind with canonical form: </p> \
	$$ l(u)=e(u)+\\int{l(v)K(u,v){\\rm d}v} \\hspace{100cm} $$ \
	<p> Discretized to a simple matrix equation </p> \
	$$ \\begin{align} {\\color{red} L} &= E+K{\\color{red} L} & &emsp;&emsp; & \\text{vector=vector+matrix*vector} \\\\ \
	&= (1-K)^{-1}E & & \\\\ \
	&= (1+K+K^2+K^3+\\cdots+)E & & \\text{Taylor expansion}\\\ (1-x)^{-1} \\end{align} \\hspace{100cm} $$ \
	<h4> Global Illumination </h4> \
	$$ L = &emsp;&emsp;E&emsp;&emsp;+&emsp;&emsp;KE&emsp;&emsp;+&emsp;&emsp;K^2E&emsp;&emsp;+&emsp;&emsp;K^3E&emsp;&emsp;+\\cdots \\hspace{100cm} $$ \
	<table class='script10' style='margin-top:-10px'> \
		<tr> \
			<td style='padding-left: 40px'> Emission directly </td> \
			<td style='padding-left: 30px'> Direct illumination </td> \
			<td style='padding-left: 30px'> Indirect illumination </td> \
			<td style='padding-left: 30px'> Indirect illumination </td> \
		<tr> </tr> \
			<td style='padding-left: 40px'> from light source </td> \
			<td style='padding-left: 30px'> on surface </td> \
			<td style='padding-left: 30px'> one bounce </td> \
			<td style='padding-left: 30px'> two bounces </td> \
		</tr> \
	</table> \
	<p style='margin:-15px 0 0 36px'> $$ \\underbrace{&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;} \\hspace{100cm} $$ </p> \
	<p class='script10' style='margin:-15px 0 0 90px'> Shading in rasterization </p> \
	<p> Light bouncing will converge (e.g., \\(K^8\\), \\(K^{16}\\)) </p> \
	<h3> <span class='badge badge-secondary' style='font-weight:normal'>[Basic]</span> Monte Carlo Integration </h3> \
	<p> Estimate the definite integral of given function </p> \
	<p> Sample on a <b> Probability Density Function (pdf) </b> \\(p(x)\\) within \\([a,b]\\) </p> \
	$$ \\int_a^b{f(x){\\rm d}x}\\approx\\frac{1}{N}\\sum_{i=1}^N{\\frac{f(X_i)}{p(X_i)}} &emsp;&emsp; X_i\\sim p(x) \\hspace{100cm} $$ \
	<h3> Path Tracing </h3> \
	$$ \\begin{align} L_o(x,\\omega_o) &= \\int_{\\Omega^+}{L_i(x,\\omega_i)f_r(x,\\omega_i\\omega_o)\\cos{\\theta_i}\\\ {\\rm d}\\omega_i} \\\\ \
	&\\approx \\frac{1}{N}\\sum_{j=1}^N{\\frac{L_i(x,\\omega_j)f_r(x,\\omega_j\\omega_o)({\\bf n}\\cdot\\omega_j)}{p(\\omega_j)}} \\end{align} \\hspace{100cm} $$ \
	<ol> \
		<li> For one pixel, uniformly choose \\(N\\) sample position within the pixel, then average results </li> \
		<li> For each sample, shoot a ray to hit the scene at \\(x\\) (one path) </li> \
		<li> To shade \\(L(x,\\omega_o)\\), randomly choose one direction \\( \\omega_i\\sim p(\\omega_i) \\) </li> \
		<li> If the ray hits the light, return the radiance (direct, sampling the light); if the ray hits an object at \\(y\\), recursively compute \\(L(y,-\\omega_i)\\) and return radiance (indirect) </li> \
	</ol> \
	<h4> Russian Roulette </h4> \
	<p> For stopping recurrence </p> \
	<p> Compute \\(L_o\\) without bias; not by limiting #bounce or energy </p> \
	<ol> \
		<li> Set a probability \\(P\\) (\\(0&lt;P&gt;1\\)) </li> \
		<li> With probability \\(P\\), shoot a ray and return the shading results by \\( \\frac{L_o}{P} \\) </li> \
		<li> With probability \\(1-P\\), ignore and get \\(0\\) </li> \
	</ol> \
	<ul> \
		<li> \\( {\\mathbb E}(L_o)=P*\\frac{L_o}{P}+(1-P)*0=L_o \\) </li> \
		<li> Expected to stop at depth \\( \\frac{P}{(1-P)} \\) in recurrence </li> \
	</ul> \
	<h4> Sampling the Light </h4> \
	<p> To avoid wasted rays when uniformly sampling the hemisphere at the shading point </p> \
	<p> Sampling the light doesn't need Russian Roulette </p> \
	<p> Need to test if the ray is blocked by other objects </p> \
	$$ \\begin{align} {\\rm d}\\omega &= \\frac{{\\rm d}A\\cos{\\theta^{'}}}{||x^{'}-x||^2} \\\\ \
	L_o(x,\\omega_o) &= \\int_{\\Omega^+}{L_i(x,\\omega_i)f_r(x,\\omega_i\\omega_o)\\cos{\\theta_i}\\\ {\\rm d}\\omega_i} \\\\ \
	&= \\int_A{L_i(x,\\omega_i)f_r(x,\\omega_i\\omega_o)\\frac{\\cos{\\theta}\\cos{\\theta^{'}}}{||x^{'}-x||^2}{\\rm d}A} \\end{align} \\hspace{100cm} $$ \
	<img width='250px' src='note_files/computer_graphics/path_tracing.png'/> \
	<h4> Other Notes </h4> \
	<ul> \
		<li> Sample at pixel instead of sample \\(\\omega\\) at point to avoid recursive exponential explosion </li> \
		<li> Radiance to color needs <b>gamma correction</b> </li> \
		<li> How to sample the hemisphere? What's the best choice of pdfs? (<b>importance sampling</b>) </li> \
		<li> Combing sampling both the hemisphere and the light (multiple importance sampling) </li> \
		<lI> Why radiance of a pixel is the average on all paths passing on it </li> \
	</ul> \
	<h2> Material </h2> \
	<img width='700px' src='note_files/computer_graphics/material.png'/> \
	<p class='script10'> <span style='margin-left:30px'>Diffuse/Lambertian Material</span> <span style='margin-left:115px'>Glossy Material</span> <span style='margin-left:96px'>Ideal Reflective/Refractive Material</span> </p> \
	<h3> Diffuse (Lambertian) Material </h3> \
	<p> Light is equally reflected in each output direction </p> \
	$$ f_r=\\frac{\\rho}{\\pi} \\hspace{100cm} $$ \
	<p> where \\(\\rho\\) is <b>albedo</b> (color) </p> \
	<h3> Perfect Specular Reflection </h3> \
	<img width='300px' src='note_files/computer_graphics/perfect_specular_reflection.png'/> \
	$$ \\begin{align} \\theta &= \\theta_i = \\theta_o \\\\ \
	\\phi_o &= (\\phi_i+\\pi)\\mod 2\\pi \\\\ \
	\\omega_o + \\omega_i &= 2\\cos\\theta{\\bf\\overrightarrow{n}} = 2(\\omega_i\\cdot{\\bf\\overrightarrow{n}}){\\bf\\overrightarrow{n}} \\\\ \
	\\omega_o &= -\\omega_i+2(\\omega_i\\cdot{\\bf\\overrightarrow{n}}){\\bf\\overrightarrow{n}} \
	\\end{align} \\hspace{100cm} $$ \
	<h3> <span class='badge badge-secondary' style='font-weight:normal'>[Basic]</span> Snell's Law </h3> \
	<img width='150px' src='note_files/computer_graphics/snell_law_0.png'/> &emsp;&emsp; \
	<img width='250px' src='note_files/computer_graphics/snell_law_1.png'/> \
	$$ \\begin{align} \\eta_i\\sin{\\theta_i} &= \\eta_t\\sin{\\theta_t} \\\\ \
	\\cos{\\theta_t} &= \\sqrt{1-\\sin^2{\\theta_t}} \\\\ \
	&= \\sqrt{1-\\left\( \\frac{\\eta_i}{\\eta_t} \\right\)^2 \\sin^2{\\theta_i}} 	\\end{align} \\hspace{100cm} $$ \
	<p> When \\( \\frac{\\eta_i}{\\eta_t}&gt;1 \\), \\(\\cos⁡{\\theta_t}\\) may not exist: light incident on boundary from large enough angle (<b>grazing angle</b>) will not refract </p> \
	<p> Index of refraction is wavelength dependent </p> \
	<table cellpadding='5px'> \
		<tr style='border-top: 1px solid #000000; border-bottom: 1px solid #000000;'> \
			<td> Medium </td> <td> \\(\\eta\\) </td> \
		</tr> <tr> \
			<td class='table_padding20'> Vacuum </td> <td> \\(1.0\\) </td> \
		</tr> <tr> \
			<td> Air (sea level) </td> <td> \\(1.00029\\) </td> \
		</tr> <tr> \
			<td> Water (20℃) </td> <td> \\(1.333\\) </td> \
		</tr> <tr> \
			<td> Glass </td> <td> \\(1.5\\)-\\(1.6\\) </td> \
		</tr> <tr style='border-bottom: 1px solid #000000;'> \
			<td> Diamond </td> <td> \\(2.42\\) </td> \
		</tr> \
	</table> \
	<h3> <span class='badge badge-secondary' style='font-weight:normal'>[Basic]</span> Fresnel Term / Reflection </h3> \
	<p> Reflectance depends on incident angle (and polarization of light) </p> \
	<img width='300px' src='note_files/computer_graphics/fresnel_term_0.png'/> &emsp;&emsp; \
	<img width='300px' src='note_files/computer_graphics/fresnel_term_1.png'/> \
	<p class='script10'> <span style='margin-left:110px'>Dielectric, \\(\\eta=1.5\\)</span> <span style='margin-left:260px'>Conductor</span> </p> \
	<p> Consider polarization: </p> \
	$$ \\begin{align} R_s &= \\left\| \\frac{\\eta_1\\cos{\\theta_i}-\\eta_2\\cos{\\theta_t}}{\\eta_1\\cos{\\theta_i+\\eta_2\\cos{\\theta_t}}} \\right\|^2 \\\\ \
	R_t &= \\left\| \\frac{\\eta_1\\cos{\\theta_t}-\\eta_2\\cos{\\theta_i}}{\\eta_1\\cos{\\theta_t}+\\eta_2\\cos{\\theta_i}} \\right\|^2 \\\\ \
	R_{\\rm eff} &= \\frac{1}{2}(R_s+R_t) \\end{align} \\hspace{100cm} $$ \
	<p> Schlick's approximation: </p> \
	$$ \\begin{align} R(\\theta) &= R_0 + (1-R_0)(1-\\cos{\\theta})^5 \\\\ \
	R_0 &= \\left\( \\frac{\\eta_1-\\eta_2}{\\eta_1+\\eta_2} \\right\)^2 \\end{align} \\hspace{100cm} $$ \
	<h3> Microfacet Material </h3> \
	<p> Surface from different views: </p> \
	<table> \
		<tr> \
			<td class='table_padding20'> - </td> <td class='table_padding20'> From macroscale view: </td> <td> flat & rough </td> <td class='table_padding20'> => </td> <td> Texture </td> \
		</tr> <tr> \
			<td> - </td> <td> From microscale view: </td> <td class='table_padding20'> bumpy & specular </td> <td> => </td> <td> Geometry </td> \
		</tr> \
	</table> \
	<p> Microfacet theory: individual element of surface act like mirrors (microfacets), each microfacet has its own normal </p> \
	<img width='500px' src='note_files/computer_graphics/microfacet_material.png'/> \
	<p> BRDF: the distribution of microfacets' normal </p> \
	<p class='script10 script_under_formula'> <span style='margin-left:76px'>Fresnel term</span> <span style='margin-left:40px'>shadowing-masking term</span> <span style='margin-left:15px'>distribution of normals</span> </p> \
	$$ f({\\bf i},{\\bf o})=\\frac{{\\bf F}({\\bf i},{\\bf h})&emsp;&emsp;&emsp;&ensp;{\\bf G}({\\bf i},{\\bf o},{\\bf h})&emsp;&emsp;&emsp;&ensp;{\\bf D}({\\bf h})}{4({\\bf n}\\cdot{\\bf i})({\\bf n}\\cdot{\\bf o})} \\hspace{100cm} $$ \
	<p> where \\( {\\bf h}=\\frac{1}{2}(\\bf{i}+\\bf{o}) \\) is half vector </p> \
	<p> <b>Shadowing-masking term</b>: consider shadowing between micro bumps </p> \
	<h3> Isotropic / Anisotropic Materials </h3> \
	<img width='400px' src='note_files/computer_graphics/isotropic.png'/> \
	<p> Isotropic BRDF (reduce dimensionality from 4D to 3D): </p> \
	<p> \\( f_r(\\theta_i,\\phi_i;\\theta_r,\\phi_r)=f_r(\\theta_i,\\theta_r,\\phi_r-\\phi_i)=f_r(\\theta_i,\\theta_r,|\\phi_r-\\phi_i|) \\) </p> \
	<p> Anisotropic BRDFs: </p> \
	<p> \\( f_r(\\theta_i,\\phi_i;\\theta_r,\\phi_r)\\neq f_r(\\theta_i,\\theta_r,\\phi_r-\\phi_i) \\) </p> \
	<h2> Computational Photography </h2> \
	<h3> Pinhole Image Formation </h3> \
	<p> Light passes through a small hole to generate an inversed image </p> \
	<p> Why pinhole?: larger hole will make each pixel on image (sensor) integrate all lights from the object, so all pixel values would be similar </p> \
	<p> Each pixel records irradiance </p> \
	<h3> Field of View (FOV) </h3> \
	<img width='150px' src='note_files/computer_graphics/fov.png'/> \
	$$ {\\rm FOV}=2\\arctan{\\left\( \\frac{h}{2f} \\right\)} \\hspace{100cm} $$ \
	<p> To maintain FOV, decrease focal length of lens in proportion to width/height of sensor </p> \
	<p> For historical reasons, it is common to refer to angular field of view by focal length of a lens used on a 35mm-format film (36×24mm): </p> \
	<table> \
		<tr> <td> 17mm </td> <td> is wide angle </td> <td> 104° </td> \
		<tr> <td> 50mm </td> <td> is \"normal\" lens </td> <td> 47° </td> \
		<tr> <td class='table_padding20'> 200mm </td> <td class='table_padding20'> is telephoto  lens </td> <td> 12° </td> \
	</table> \
	<h3> Exposure </h3> \
	<p> Exposure = time × irradiance (H=T×E) </p> \
	<p> T (exposure time): controlled by shutter </p> \
	<p> E (irradiance): power of light falling on a unit area of sensor, controlled by lens aperture and focal length </p> \
	<p> Exposure control in photography: </p> \
	<ul> \
		<li> Aperture size: change the f-stop by opening / closing the aperture (if camera has iris control) </li> \
		<li> Shutter speed: change the duration the sensor pixels integrate light </li> \
		<li> ISO gain: change the amplification (analog and/or digital) between sensor values and digital image values </li> \
	</ul> \
	<img width='500px' src='note_files/computer_graphics/exposure_0.png'/> \
	<h4> F-Number (F-Stop) </h4> \
	<p> Exposure levels </p> \
	<p> Definition: the <a href='#_Thin_Lens_'>focal length</a> divided by the diameter of the aperture </p> \
	<p> Written as F<span style='color:red'>N</span>, F<span style='color:red'>N,M</span> (=F<span style='color:red'>N.M</span>) or F/<span style='color:red'>N</span>; <span style='color:red'>N</span> is the f-number </p> \
	<p> Smaller <span style='color:red'>N</span>, larger aperture size, more blur </p> \
	<h4> Shutter Speed </h4> \
	<p> Slower shutter speed, more motion blur: e.g., hand shake, subject movement </p> \
	<p> Double shutter time doubles motion blur </p> \
	<p> Rolling shutter problem: different parts of photo taken at different times, cause deformation </p> \
	<h4> ISO Gain </h4> \
	<P> Film: trade sensitivity for grain </p> \
	<p> Digital: trade sensitivity for noise </p> \
	<ul> \
		<li> Multiply signal before analog-to-digit conversion </li> \
		<li> Linear effect (ISO 200 needs half the light as ISO 100) </li> \
		<li> More ISO, more noise </li> \
	</ul> \
	<h4> Fast and Slow Photography </h4> \
	<p> High-Speed Photography: extremely fast shutter speed, larger aperture and/or high ISO </p> \
	<p> Long-Exposure Photography: extremely slow shutter speed </p> \
	<img width='300px' src='note_files/computer_graphics/exposure_1.png'/> &emsp;&emsp;\
	<img width='300px' src='note_files/computer_graphics/exposure_2.png'/> \
	<h3> Thin Lens </h3> \
	<ul> \
		<li> All parallel rays entering a lens pass through its focal point </li> \
		<li> All rays through a focal point will be in parallel after passing the lens </li> \
		<li> Focal length f can be arbitrarily changed </li> \
	</ul> \
	<img width='300px' src='note_files/computer_graphics/thin_lens.png'/> \
	<p> Thin lens equation: </p> \
	$$ \\frac{1}{f} = \\frac{1}{z_i} + \\frac{1}{z_o} \\hspace{100cm} $$ \
	<h3> Circle of Confusion (CoC) </h3> \
	<img width='400px' src='note_files/computer_graphics/circle_of_confusion.png'/> \
	<p> Circle of confusion is proportional to the size of the aperture </p> \
	$$ \\frac{C}{A} = \\frac{d^{'}}{z_i} = \\frac{|z_s-z_i|}{z_i} \\hspace{100cm} $$ \
	<h3> Ray Tracing Ideal Thin Lenses </h3> \
	<p> One possible setup: </p> \
	<ol> \
		<li> Choose sensor size, lens focal length and aperture size </li> \
		<li> Choose depth of subject of interest \\(z_o\\) </li> \
		<li> Calculate corresponding depth of sensor \\(z_i\\) from thin lens equation </li> \
		<li> For each pixel x' on the sensor, sample random point x'' on lens plane </li> \
		<li> Pass the ray through the lens will hit x''' (consider virtual ray x' -> x''') </li> \
		<li> Estimate radiance on ray x'' -> x''' </li> \
	</ol> \
	<img width='400px' src='note_files/computer_graphics/ray_tracing_ideal_thin_lens.png'/> \
	<h3> Depth of Field </h3> \
	<p> Set circle of confusion as the maximum permissible blur spot on the image plane that will appear sharp under final viewing conditions </p> \
	$$ {\\rm DOF}={\\rm DF-DN}=\\frac{D_sf^2}{f^2-\\frac{fC}{A}(D_s-f)}-\\frac{D_sf^2}{f^2+\\frac{fC}{A}(D_s-f)} \\hspace{100cm} $$ \
	<img width='350px' src='note_files/computer_graphics/depth_of_field_0.png'/> &emsp;&emsp; \
	<img width='350px' src='note_files/computer_graphics/depth_of_field_1.png'/> \
	<h3> The Plenoptic Function </h3> \
	<p> \\( P(\\theta,\\phi,\\lambda,t,V_x,V_y,V_z) \\) </p> \
	<p> Can reconstruct the intensity of light from every possible view \\( (\\theta,\\phi) \\), at every moment \\( (t) \\), from every position \\( (V_x,V_y,V_z) \\), at every wavelength \\( (\\lambda) \\) </p> \
	<p> Contains every photograph, every movie, everything that anyone has ever seen </p> \
	<h3> Light Field (Lumigraph) </h3> \
	<p> Store the radiance information of every pixel seen from every direction (2D+2D=4D) </p> \
	<p> 2-plane parameterization (2D position + 2D position): \\( (s,t,u,v) \\) </p> \
	<img width='150px' src='note_files/computer_graphics/light_field_0.png'/> &emsp;&emsp; \
	<img width='100px' src='note_files/computer_graphics/light_field_1.png'/> \
	<p> Light field camera: each pixel (irradiance) is stored as a block of pixels (radiance) </p> \
	<ul> \
		<li> Two-layer structure: microlens on each pixel (1st layer) transmit lights from different directions to different 2D locations on digital sensor (2nd layer) </li> \
		<li> Virtually change focal length & aperture size, etc. after taking photo </li> \
		<li> Insufficient spatial resolution </li> \
	</ul> \
	<h2> Color </h2> \
	<p> Color is a phenomenon of human perception; it is not a universal property of light </p> \
	<h3> Spectral Power Distribution (SPD) </h3> \
	<img width='500px' src='note_files/computer_graphics/spectral_power_distribution_0.png'/> &emsp; \
	<img width='200px' src='note_files/computer_graphics/spectral_power_distribution_1.png'/> \
	<p> Salient property in measuring light; the amount of light present at each wavelength </p> \
	<p> Linear additive </p> \
	<h3> The Human Eye </h3> \
	<p> Retinal photoreceptor cell: </p> \
	<ul> \
		<li> Rod: primary receptors in very low light (\"scotopic\" conditions, e.g. dim moonlight); ~120 million rods in eye; perceive only shades of gray, no color </li> \
		<li> Cone: primary receptors in typical light levels (\"photopic\"); ~6-7 million cones in eye; provide sensation of color; three types of cones (S,M,L), each with different spectral sensitivity </li> \
	</ul> \
	<p> Assume \\( \\mathbb{S}(\\lambda) \\) is spectrum (SPD), then the responses: </p> \
	$$ \\begin{align} S &= \\int_{\\lambda}{r_S(\\lambda)\\cdot\\mathbb{S}(\\lambda)\\\ {\\rm d}\\lambda} \\\\ \
	M &= \\int_{\\lambda}{r_M(\\lambda)\\cdot\\mathbb{S}(\\lambda)\\\ {\\rm d}\\lambda} \\\\ \
	L &= \\int_{\\lambda}{r_L(\\lambda)\\cdot\\mathbb{S}(\\lambda)\\\ {\\rm d}\\lambda} \\end{align} \\hspace{100cm} $$ \
	<img width='300px' src='note_files/computer_graphics/the_human_eye_0.png'/> &emsp;&emsp; \
	<img width='250px' src='note_files/computer_graphics/the_human_eye_1.png'/> \
	<p> The eye \"sees\" only three response values (S,M,L), and this is only info available to brain </p> \
	<p> <b>Metamerism</b>: two different spectra that project to the same (S,M,L) response </p> \
	<h3> CIE XYZ </h3> \
	<p> Imaginary set of standard color primaries X,Y,Z </p> \
	<ul> \
		<li> Primary colors with these matching functions do not exist </li> \
		<li> Y is luminance (brightness regardless of color) </li> \
		<li> Matching functions are strictly positive; span all observable colors </li> \
	</ul> \
	<h4> Color Matching Function </h4> \
	$$ \\begin{align} X_{\\rm CIE XYZ} &= \\int_{\\lambda}{\\overline{x}(\\lambda)\\cdot\\mathbb{S}(\\lambda)\\\ {\\rm d}\\lambda} \\\\ \
	Y_{\\rm CIE XYZ} &= \\int_{\\lambda}{\\overline{y}(\\lambda)\\cdot\\mathbb{S}(\\lambda)\\\ {\\rm d}\\lambda} \\\\ \
	Z_{\\rm CIE XYZ} &= \\int_{\\lambda}{\\overline{z}(\\lambda)\\cdot\\mathbb{S}(\\lambda)\\\ {\\rm d}\\lambda} \\end{align} \\hspace{100cm} $$ \
	<img width='300px' src='note_files/computer_graphics/cie_xyz_0.png'/> &emsp;&emsp; \
	<img width='250px' src='note_files/computer_graphics/cie_xyz_1.png'/> \
	<h4> Chromaticity Diagram </h4> \
	<ol> \
		<li> Choose a fixed luminance Y </li> \
		<li> <p> Chromaticity defined as </p> \
		$$ x=\\frac{X}{X+Y+Z},&emsp;y=\\frac{y}{x+y+z},&emsp;z=\\frac{Z}{X+Y+Z} \\hspace{100cm} $$ </li> \
		<li> Since \\(x+y+z=1\\), plot \\( (x,y) \\) cords at specific brightness Y </li> \
	</ol> \
	<p> -&emsp; Curve boundary corresponds to monochromatic light (pure color of a single wavelength) </p> \
	<p> -&emsp; Any color inside is less pure (mixed) </p> \
	<h4> Gamut </h4> \
	<p> Gamut is the set of chromaticities generated by a set of color primaries </p> \
	<p> Different color spaces represent different ranges of colors </p> \
	<h3> CIE RGB </h3> \
	<p> <b>Additive Color Space</b>: more color mixed, lighter it will be; describe light </p> \
	<ol> \
		<li> Given a set of primary lights, each with its own spectral distribution (e.g. R,G,B-single wavelength) </li> \
		<li> <p> The brightness of lights can be added together </p> \
		<p> \\( R\\cdot\\mathbb{S}_R(\\lambda)+G\\cdot\\mathbb{S}_G(\\lambda)+B\\cdot\\mathbb{S}_B(\\lambda) \\) </p> </li> \
		<li> <p> Color (with wavelength \\(\\lambda\\)) can be measured and described by the scalar values </p> \
		<p> \\( R,G,B=\\overline{r}(\\lambda),\\overline{g}(\\lambda),\\overline{b}(\\lambda) \\) </p> </li> \
	</ol> \
	<img width='200px' src='note_files/computer_graphics/cie_rgb_0.png'/> &emsp;&emsp; \
	<img width='250px' src='note_files/computer_graphics/cie_rgb_1.png'/> &emsp;&emsp; \
	<img width='350px' src='note_files/computer_graphics/cie_rgb_2.png'/> \
	<h3> sRGB </h3> \
	<p> A particular monitor RGB standard </p> \
	<p> Gamut is limited </p> \
	<p> <b>Gamma Correction</b>: nonlinear transfer between the intensity and actual values stored, to facilitate the luminance discrimination of human (a little darker than linear RGB) </p> \
	$$ \\begin{align} \\text{linearRGB}\\rightarrow\\text{sRGB}:&emsp; & \\gamma(u)=\\begin{cases} 12.92u & u\\le 0.0031308 \\\\ 1.055u^{\\frac{1}{2.4}}-0.055 & \\text{otherwise} \\end{cases} \\\\ \
	\\text{sRGB}\\rightarrow\\text{linearRGB}:&emsp; & \\gamma^{-1}(v)=\\begin{cases} \\frac{v}{12.92} & v\\le 0.04045 \\\\ \\left\( \\frac{v+0.055}{1.055} \\right\)^{2.4}&emsp;&ensp; & \\text{otherwise} \\end{cases} \\end{align} \\hspace{100cm} $$ \
	<h3> HSV </h3> \
	<p> Perceptually organized color space </p> \
	<ul> \
		<li> Hue: the \"kind\" of color; dominant wavelength correlated </li> \
		<li> Saturation: the \"colorfulness\"; purity correlated </li> \
		<li> Lightness (or Value): the overall amount of light; luminance correlated </li> \
	</ul> \
	<img width='200px' src='note_files/computer_graphics/hsv.png'/> \
	<h3> CIE LAB </h3> \
	<p> <b>Opponent Color Theory</b>: the brain seems to encode color early on using three axes: <span style='color:#cccccc'><b>white</b></span>-<b>black</b>, <span style='color:red'><b>red</b></span>-<span style='color:green'><b>green</b></span>, <span style='color:blue'><b>blue</b></span>-<span style='color:#ffdd00'><b>yellow</b></span> (e.g., evidence: visual residual) </p> \
	<ul> \
		<li> L: lightness </li> \
		<li> a & b: color-opponent pair; a (<span style='color:red'><b>red</b></span>-<span style='color:green'><b>green</b></span>), b (<span style='color:blue'><b>blue</b></span>-<span style='color:#ffdd00'><b>yellow</b></span>) </li> \
	</ul> \
	<h3> CMYK </h3> \
	<p> <b> Subtractive Color Space</b>: more color mixed, darker it will be; describe material which absorb light </p> \
	<p> Cyan, Magenta, Yellow and Key (Black, for black-and-white-print to save chromatic ink) </p> \
	<img width='100px' src='note_files/computer_graphics/cmyk_0.png'/> &emsp;&emsp; \
	<img width='200px' src='note_files/computer_graphics/cmyk_1.png'/> \
	<h3> YUV (YCbCr) </h3> \
	<ul> \
		<li> Y: luminance </li> \
		<li> U & V: chorma </li> \
	</ul> \
	<p> Human is sensitive to luminance rather than location and chroma, so use chrominance subsampling to resample U & V for depression (often 2, 4, or 8 pixels shared the same U + V) </p> \
	<h3> High-Dynamic Range (HDR) </h3> \
	<p> A greater range of luminosity than standard digital imaging (16-bit data) </p> \
	<p> Useful for recording very bright or dark scenes, providing detailed resolution around bright/dark color </p> \
	<p> Result from merging multiple low-dynamic range (LDR) photographs </p> \
	<img width='645px' src='note_files/computer_graphics/hdr_0.png'/> &emsp;→&emsp; \
	<img width='152px' src='note_files/computer_graphics/hdr_1.png'/> \
	<h2> Animation </h2> \
	<h3> Mass Spring System </h3> \
	<img width='100px' src='note_files/computer_graphics/mass_spring_system_0.png'/> \
	<p> Force pulls points at length \\(l\\): </p> \
	$$ {\\bf f}_a=k_s&emsp;\\frac{{\\bf b}-{\\bf a}}{||{\\bf b}-{\\bf a}||}&emsp;(||{\\bf b}-{\\bf a}||-l)=-{\\bf f}_b \\hspace{100cm} $$ \
	<p class='script10' style='margin:-10px 0 15px 0'> <span style='margin-left:22px'>Stiffness</span> <span style='margin-left:17px'>Direction</span> <span style='margin-left:90px'>Rest length</span> </p> \
	<p> Energy loss: </p> \
	$$ {\\bf e}_a=k_d&emsp;\\frac{{\\bf b}-{\\bf a}}{||{\\bf b}-{\\bf a}||}\\cdot\\left\(\\dot{b}-\\dot{a}\\right\)&ensp;\\cdot&ensp;\\frac{{\\bf b}-{\\bf a}}{||{\\bf b}-{\\bf a}||} \\hspace{100cm} $$ \
	<p class='script10 script_under_formula'> <span style='margin-left:22px'>Damping</span> <span style='margin-left:12px'>Relative velocity projected</span> <span style='margin-left:40px'>Direction</span> </p> \
	<p> where \\(\\bf a\\) is position, \\(\\dot{a}=\\frac{{\\rm d}a}{{\\rm d}t} \\), \\( \\ddot{a}=\\frac{{\\rm d}\\dot{a}}{{\\rm d}t} \\) </p> \
	<p> Structures from springs: </p> \
	<img width='100px' src='note_files/computer_graphics/mass_spring_system_1.png'/> &emsp;&emsp;\
	<img width='100px' src='note_files/computer_graphics/mass_spring_system_2.png'/> &emsp;&emsp;\
	<img width='100px' src='note_files/computer_graphics/mass_spring_system_3.png'/> &emsp;&emsp;\
	<img width='103px' src='note_files/computer_graphics/mass_spring_system_4.png'/> \
	<p class='script10'> <span style='margin-left:30px'> Blocks </span> <span style='margin-left:100px'> Sheets </span> <span style='margin-left:75px'> Resist shearing </span> <span style='margin-left:55px'> Resist bending </span> </p> \
	<h3> Particle System </h3> \
	<p> Model dynamical systems (e.g., fire, fluid, steam) as collections of large numbers of particles </p> \
	<ol> \
		<li> For each frame, create new particles </li> \
		<li> Calculate forces on each particle, update its position and velocity </li> \
		<li> Remove dead particles, render </li> \
	</ol> \
	<p> Particle forces: </p> \
	<ul> \
		<li> <p> Attraction and repulsion forces: gravity, electromagnetism, springs, propulsion ... </p> \
		$$ {\\bf f}_g = G\\frac{m_1m_2}{d^2} \\hspace{100cm} $$ </li> \
		<li> Damping forces: friction, air drag, viscosity </li> \
		<li> Collisions </ii> \
	</ul> \
	<p> Simulated as an <b>Ordinary Differential Equation (ODE)</b> </li> \
	<h3> Forward Kinematics </h3> \
	<p> Articulated skeleton </p> \
	<ul> \
		<li> Topology & tree structure </li> \
		<li> Geometric relations from joints: pin (1D rotation), ball (2D rotation), prismatic (translation) </li> \
	</ul> \
	<p> Convenient for direct control, not convenient for artists </p> \
	$$ \\begin{align} p_z &= l_1\\cos{\\theta_1}+l_2\\cos{\\theta_1+\\theta_2} \\\\ \
	p_x &= l_1\\sin{\\theta_1}+l_2\\sin{\\theta_1+\\theta_2} \\end{align} \\hspace{100cm} $$ \
	<img width='200px' src='note_files/computer_graphics/forward_kinematics.png'/> \
	<h3> Inverse Kinematics </h3> \
	<p> Animator provides position of end-effector, computer determine joint angles that satisfy constraints </p> \
	$$ \\begin{align} \\theta_2 &= \\cos^{-1}{\\left\( \\frac{p_z^2+p_x^2-l_1^2-l_2^2}{2l_1l_2} \\right\) } \\\\ \
	\\theta_1 &= \\frac{-p_zl_2\\sin{\\theta_2}+p_x(l_1+l_2\\cos{\\theta_2})}{p_xl_2\\sin{\\theta_2}+p_z(l_1+l_2\\cos{\\theta_2})} \\end{align} \\hspace{100cm} $$ \
	<p> May have multiple solutions or no solution </p> \
	<p> Numerical solution to general N-link IK problem: </p> \
	<ol> \
		<li> Choose an initial configuration </li> \
		<li> Define an error metric (e.g., square of distance between goals and current position) </li> \
		<li> Compute gradient of error as function of configuration </li> \
		<li> Apply gradient descent (or Newton's method, or other optimization procedures) </li> \
	</ol> \
	<h3> Key-Based Animation Generation </h3> \
	<h4> Keyframe Animation </h4> \
	<p> Lead animator creates keyframes; computer creates in-between frames (tweening) </p> \
	<p> Consider each keyframe as a vector with parameters, then interpolate (e.g., splines) </p> \
	<h4> Rigging </h4> \
	<p> High-level control on characters to allow rapid and intuitive modification of pose, deformations, expression, etc. </p> \
	<p> Manual control key points / curves / etc. </p> \
	<h4> Blending Shapes </h4> \
	<p> Instead of skeleton, interpolate directly between surfaces (e.g., model a collection of facial expressions) </p> \
	<h4> Motion Capture </h4> \
	<p> Record real-world performance (e.g., person executing and activity) </p> \
	<p> High realism, complex set-ups, require artists' alternations </p> \
	<p> Equipment: </p> \
	<ul> \
		<li> Optical: 3D positional tracking by triangulation from multiple cameras; occlusions are difficult </li> \
		<li> Magnetic (sense magnetic field to infer position/orientation) </li> \
		<li> Mechanical (measure joint angle directly, restrict motion) </li> \
	</ul> \
	<h3> Euler's Method </h3> \
	<p> Single particle simulation by measuring position and velocity </p> \
	<p> Default is Explicit Euler (Forward Euler) </p> \
	$$ \\begin{align} {\\bf x}^{t+\\Delta t} &= {\\bf x}^t + \\Delta t\\\ \\dot{\\bf x}^t \\\\ \
	\\dot{\\bf x}^{t+\\Delta t} &= \\dot{\\bf x}^t + \\Delta t\\\ \\ddot{\\bf x}^t \\end{align} \\hspace{100cm} $$ \
	<p> With numerical integration, errors accumulate </p> \
	<p> -&emsp; Inaccuracy increases as \\(\\Delta t\\) increases </p> \
	<p> -&emsp; Instability, causes simulation to diverge </p> \
	<h4> Midpoint Method </h4> \
	$$ \\begin{align} {\\bf x}_{\\rm mid} &= {\\bf x}(t) + \\frac{\\Delta t}{2}{\\bf v}\\left\( {\\bf x}(t),t \\right\) \\\\ \
	{\\bf x}(t+\\Delta t) &= {\\bf x}(t) + \\Delta t\\\ {\\bf v}\\left\( {\\bf x}_{\\rm mid},t \\right\) \\end{align} \\hspace{100cm} $$ \
	<h4> Modified Euler </h4> \
	<p> Average velocity at start and end of step </p> \
	$$ \\begin{align} {\\bf x}^{t+\\Delta t} &= {\\bf x}^t + \\frac{\\Delta t}{2}\\left\( \\dot{\\bf x}^t + \\dot{\\bf x}^{t+\\Delta t} \\right\) \\\\ \
	&= {\\bf x}^t + \\Delta t\\\ \\dot{\\bf x}^t + \\frac{(\\Delta t)^2}{2}\\ddot{\\bf x}^t \\end{align} \\hspace{100cm} $$ \
	<p> Adaptive Step Size </p> \
	<ol> \
		<li> Compute \\(x_1^T\\) with a Euler step of size \\(T\\); compute \\(x_{1/2}^T\\) with two Euler steps of size \\(T/2\\) </li> \
		<li> Compute error \\(||x_1^T-x_{1/2}^T||\\), if error exceeds a threshold reduce step size and try again </li> \
	</ol> \
	<h4> Implicit Euler (Backward Euler) </h4> \
	$$ \\begin{align} {\\bf x}^{t+\\Delta t} &= {\\bf x}^t + \\Delta t\\\ \\dot{\\bf x}^{t+\\Delta t} \\\\ \
	\\dot{\\bf x}^{t+\\Delta t} &= \\dot{\\bf x}^t + \\Delta t\\\ \\ddot{\\bf x}^{t+\\Delta t} \\end{align} \\hspace{100cm} $$ \
	<p> Solve nonlinear problem by root-finding algorithm (e.g., Newton's method) </p> \
	<p> Much better stability: </p> \
	<p> -&emsp; Implicit Euler has order-one </p> \
	<p> -&emsp; Local truncation error: \\( {\\rm O}\\left\((\\Delta t)^2\\right\) \\) </p> \
	<p> -&emsp; Global truncation error: \\( {\\rm O}(\\Delta t) \\) </p> \
	<h3> Runge-Kutta Families </h3> \
	<p> Solving ODEs, good at dealing with non-linearity </p> \
	<p> Its order-four version is the most widely used (a.k.a. RK4): </p> \
	$$ \\frac{{\\rm d}y}{{\\rm d}t}=f(t,y),&emsp;y(t_0)=y_0 \\hspace{100cm} $$ \
	$$ \\begin{align} t_{n+1} &= t_n + h \\\\ \
	y_{n+1} &= y_n+\\frac{1}{6}h(k_1+2k_2+2k_3+k_4) \\\\ \
	k_1 &= f(t_n,&ensp;y_n) \\\\ \
	k_2 &= f\\left\( t_n+\\frac{h}{2},&ensp;y_n+h\\frac{k_1}{2} \\right\) \\\\ \
	k_3 &= f\\left\( t_n+\\frac{h}{2},&ensp;y_n+h\\frac{k_2}{2} \\right\) \\\\ \
	k_4 &= f(t_n+h,&ensp;y_n+hk_3) \\end{align} \\hspace{100cm} $$ \
	<h3> Verlet Integration </h3> \
	<p> Four-order precision to simulate position </p> \
	$$ \\begin{align} {\\bf x}^{t+\\Delta t} &= {\\bf x}^t+\\dot{\\bf x}^t\\Delta t+\\frac{1}{2}\\ddot{\\bf x}^t(\\Delta t)^2+\\frac{1}{6}\\dddot{\\bf x}(\\Delta t)^3 + {\\rm O}\\left\((\\Delta t)^4\\right\) \\\\ \
	{\\bf x}^{t-\\Delta t} &= {\\bf x}^t-\\dot{\\bf x}^t\\Delta t+\\frac{1}{2}\\ddot{\\bf x}^t(\\Delta t)^2-\\frac{1}{6}\\dddot{\\bf x}(\\Delta t)^3 + {\\rm O}\\left\((\\Delta t)^4\\right\) \\end{align} \\hspace{100cm} $$ \
	<p> Taylor expansion and sum </p> \
	$$ {\\bf x}^{t+\\Delta t} = 2{\\bf x}^t - {\\bf x}^{t-\\Delta t} + \\ddot{\\bf x}^t(\\Delta t)^2 + {\\rm O}\\left\((\\Delta t)^4\\right\) \\hspace{100cm} $$ \
	<p> Velocity of \\(t\\) can be obtained at \\(t+\\Delta t\\) </p> \
	$$ \\dot{\\bf x}^t = \\frac{{\\bf x}^{t+\\Delta t}-{\\bf x}^{t-\\Delta t}}{2\\Delta t} + {\\rm O}\\left\( (\\Delta t)^2 \\right\) \\hspace{100cm} $$ \
	<h3> Rigid Body Simulation </h3> \
	<p> No internal deformation; similar to simulate a particle </p> \
	$$ \\frac{\\rm d}{{\\rm d}t}\\begin{pmatrix} &ensp; {\\bf X} &ensp; & &ensp; \\dot{\\bf X} &ensp; & &ensp; \\theta &ensp; & &ensp; \\omega &emsp; \\end{pmatrix} &emsp; = &emsp; \\begin{pmatrix} &ensp; \\dot{\\bf X}&ensp; & &ensp; \\frac{\\bf F}{m} &ensp; & &ensp; \\omega &ensp; &&ensp;  \\frac{\\Gamma}{I} &ensp; \\end{pmatrix} \\hspace{100cm} $$ \
	<p class='script10 script_under_formula'> <span style='margin-left:32px'>Position</span> <span style='margin-left:12px'>Velocity</span> <span style='margin-left:12px'>Angle</span> <span style='margin-left:8px'>Angular velocity</span> <span style='margin-left:75px'>Force / mass</span> <span style='margin-left:15px'>Torque / momentum of inertia</span> </p> \
	<h3> Fluid Simulation </h3> \
	<p> Simple <b>Position-Based Method</b> / <b><a href='#_Verlet_Integration_'>Verlet Integration</a></b> \
	<ol> \
		<li> Assume water is composed of small rigid-body spheres and cannot be compressed </li> \
		<li> As long as density changes somewhere, it should be corrected via changing the positions of particles </li> \
		<li> <p> Compute gradient of the density anywhere w.r.t. each particle's position </p> \
		<p> Density: near neighbor problem </p> </li> \
		<li> Gradient descent </li> \
	</ol> \
	<h3> Lagrangian vs. Eulerian </h3> \
	<p> Two different views to simulate large collections of objects </p> \
	<p> Lagrangian (mass point) approach: monitor the same particle throughout its course </p> \
	<p> Eulerian (grid) approach: monitor a stationary region and consider particles pass through </p> \
	<h3> Material Point Method (MPM) </h3> \
	<p> Hybrid, combining Eulerian and Lagrangian views </p> \
	<ul> \
		<li> Lagrangian: consider particles carrying material properties </li> \
		<li> Eulerian: use a grid to do numerical integration </li> \
		<li> Interaction: particles transfer properties to grid, grid performs update, then interpolate back to particles </li> \
	</ul> \
	<h2> <span class='badge badge-secondary' style='font-weight:normal'>[Advanced]</span> Rendering </h2> \
	<h3> Bidirectional Path Tracing (BDPT) </h3> \
	<ol> \
		<li> Trace sub-paths from both the camera and the light </li> \
		<li> Connect the end points from both sub-paths </li> \
	</ol> \
	<p> -&emsp; Unbiased </p> \
	<p> -&emsp; Suitable if the light transport is complex on the light's side </p> \
	<p> -&emsp; Difficult to implement & quite slow </p> \
	<h3> Metropolis Light Transport (MLT) </h3> \
	<p> <b>Markov Chain Monte Carlo (MCMC)</b>: Jumping from the current sample to the next with specific PDF </p> \
	<p> Locally perturb an existing path to get a new path </p> \
	<p> -&emsp; Unbiased </p> \
	<p> -&emsp; Very good at locally exploring difficult light paths </p> \
	<p> -&emsp; Work great with difficult light path </p> \
	<p> -&emsp; Achieve minimum variance when \\(f(x)\\) and \\(p(x)\\) are of the same shape in Monte Carlo Integration </p> \
	<p> -&emsp; Difficult to estimate the convergence rate, not used to render animation </p> \
	<p> -&emsp; Do not guarantee equal convergence rate per pixel (dirty results) </p> \
	<h3> Photon Mapping </h3> \
	<ol> \
		<li> Stage 1 (photon tracing): emitting photons from the light source, bouncing them around, then recording photons on diffuse surfaces </li> \
		<li> Stage 2 (photon collection, final gathering): shoot sub-paths from the camera, bouncing them around, until they hit diffuse surfaces </li> \
		<li> Calculation (local density estimation): for each shading point, find the nearest \\(N\\) photons; take the surface area \\(A\\) they cover; brightness is \\(N/A\\) </li> \
	</ol> \
	<p> -&emsp; More photons emitted => the same \\(N\\) photons cover smaller \\(\\Delta A\\) => \\(\\Delta A\\) is closer to \\({\\rm d}A\\) </p> \
	<p> -&emsp; Biased (blurry), but consistent (not blurry with infinite #samples) </p> \
	<p> -&emsp; Very good at handling <b>Specular-Diffuse-Specular (SDS)</b> paths and generating caustics </p> \
	<h3> Vertex Connection and Merging (VCM) </h3> \
	<p> Combination of BDPT and Photon Mapping </p> \
	<ul> \
		<li> Not waste the sub-paths in BDPT if their end points cannot be connected but can be merged (close) </li> \
		<li> Use photon mapping to handle the merging of nearby \"photons\" </li> \
	</ul> \
	<h3> Instant Radiosity (IR) </h3> \
	<p> Many-light approaches: lit surfaces can be treated as light sources </p> \
	<ol> \
		<li> Shoot light sub-paths and assume the end point of each sub-path is a Virtual Point Light (VPL) </li> \
		<li> Render the scene as usual using these VPLs </li> \
	</ol> \
	<p> -&emsp; Fast and usually gives good results on diffuse scenes </p> \
	<p> -&emsp; Spikes will emerge when VPLs are close to shading points </p> \
	<p> -&emsp; Cannot handle glossy materials </p> \
	<h2> <span class='badge badge-secondary' style='font-weight:normal'>[Advanced]</span> Material </h2> \
	<h3> Participating Media </h3> \
	<p> Like cloud, fog, ... </p> \
	<p> At any point as light travels through a participating medium, it can be (partially) absorbed and scattered </p> \
	<p> Use Phase Function to describe the angular distribution of light scattering at any point x within participating media </p> \
	<ul> \
		<li> Randomly choose a direction to bounce </li> \
		<li> Randomly choose a distance to go straight </li> \
		<li> At each \"shading point\", connect to the light </li> \
	</ul> \
	<img width='250px' src='note_files/computer_graphics/participating_media_0.png'/> &emsp;&emsp; \
	<img width='200px' src='note_files/computer_graphics/participating_media_1.png'/> \
	<h3> Hair Appearance </h3> \
	<img width='120px' src='note_files/computer_graphics/hair_appearance_0.png'/> &emsp;&emsp; \
	<img width='100px' src='note_files/computer_graphics/hair_appearance_1.png'/> &emsp;&emsp; \
	<img width='100px' src='note_files/computer_graphics/hair_appearance_2.png'/> \
	<h4> Kajiya-Kay Model </h4> \
	<p> Scatter the incident light into a cone-shaped region </p> \
	<h4> Marschner Model </h4> \
	<p> Treat hair as glass-like cylinder </p> \
	<p> 3 types of light interactions: R, TT and TRT (R: reflection; T: transmission) </p> \
	<h4> Yan's Model </h4> \
	<p> Treat hair as double cylinder model </p> \
	<p> 5 types of light interactions: plus TRTs and TTs </p> \
	<p> -&emsp; Good to represent diffusive and saturated appearance (e.g., animal fur) </p> \
	<h3> Granular Material </h3> \
	<p> Procedural definition to avoid explicit modeling of all granules </p> \
	<img width='450px' src='note_files/computer_graphics/granular_material.png'/> \
	<h3> Subsurface Scattering </h3> \
	<p> Rendering translucent surface </p> \
	<p> Visual characteristics of many surfaces caused by light exiting at different points than it enters </p> \
	<img width='250px' src='note_files/computer_graphics/subsurface_scattering_0.png'/> \
	<p> <b>BSSRDF</b>: \\( S(x_i,\\omega_i,x_o,\\omega_o) \\); generalization of BRDF; exit radiance at one point due to incident differential irradiance at another point </p> \
	<p> Scattering function: </p> \
	$$ L_o(x,\\omega_o)=\\int_A{\\int_{H^2}{S(x_i,\\omega_i,x_o,\\omega_o)L_i(x,\\omega_i)\\cos{\\theta_i}\\\ {\\rm d}\\omega_i\\\ {\\rm d}A}} \\hspace{100cm} $$ \
	<h4> Dipole Approximation </h4> \
	<p> Approximate light diffusion by introducing two point sources </p> \
	<img width='300px' src='note_files/computer_graphics/subsurface_scattering_1.png'/> \
	<h3> Cloth </h3> \
	<table> \
		<tr> \
			<td class='table_padding20'> <b>Fiber</b>: </td> <td> a slender, elongated, threadlike unit </td> \
		</tr> <tr> \
			<td> <b>Ply</b>: </td> <td> collection of twisted fibers </td> \
		</tr> <tr> \
			<td> <b>Yarn</b>: </td> <td> collection of twisted plies </td> \
		</tr> <tr> \
			<td> <b>Cloth</b>: </td> <td> woven or knitted yarns </td> \
		</tr> \
	</table> \
	<img height='60px' src='note_files/computer_graphics/cloth_0.png'/> &emsp;&emsp; \
	<img height='60px' src='note_files/computer_graphics/cloth_1.png'/> &emsp;&emsp; \
	<img height='60px' src='note_files/computer_graphics/cloth_2.png'/> \
	<ul> \
		<li> Given the weaving pattern; render as surface; using BRDF </li> \
		<li> Properties of individual fibers & their distribution; render as a participating medium (velvet) </li> \
		<li> Render every fiber explicitly </li> \
	</ul> \
	<h3> Detailed Appearance </h3> \
	<p> Real world is more complicated; ideal rendering is not realistic </p> \
	<ul> \
		<li> Use actual distribution of normals (NDF) instead of statistical distribution (with no noise) </li> \
		<li> BRDF over a pixel (corresponding to a larger patch) to generate noisy NDF </li> \
		<li> Recent trend: detailed material under wave optics </li> \
	</ul> \
	<img height='150px' src='note_files/computer_graphics/detailed_appearance_0.png'/> &emsp;&emsp; \
	<img height='150px' src='note_files/computer_graphics/detailed_appearance_1.png'/> &emsp;&emsp; \
	<img height='150px' src='note_files/computer_graphics/detailed_appearance_2.png'/> \
";