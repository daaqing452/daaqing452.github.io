var str_computer_graphics = "\
	<h1 anchorid='atitle'> Computer Graphics </h1> \
	<h2 anchorid='a0'> Transformation </h2> \
	<h3 anchorid='a0b0'> Homogeneous Coordinate </h3> \
	<p>3D Point: \\( (x,y,z,1)^\\top \\) </p> \
	<p>3D Vector: \\( (x,y,z,0)^\\top \\) </p> \
	<p> Vector \\( \\pm \\) Vector \\( = \\) Vector </p> \
	<p> Point \\( \\pm \\) Vector \\( = \\) Point </p> \
	<p> Point \\( - \\) Point \\( = \\) Vector </p> \
	<p> Point \\( + \\) Point \\( = \\) ? &emsp;&emsp; \\( (x,y,z,w)^\\top = (x/w,y/w,z/w,1)^\\top \\) </p> \
	<h3 anchorid='a0b1'> Basic Linear Transformation </h3> \
	<table class='mdtable'> \
		<tr> \
			<td> Translation: </td> \
			<td class='tablespan30'></td> \
			<td> \\( {\\bf T} (t_x,t_y,t_z) = \\begin{bmatrix} \
				1 &   &   & t_x \\\\ \
				  & 1 &   & t_y \\\\ \
	 			  &   & 1 & t_z \\\\ \
	 			  &   &   &  1       \
			\\end{bmatrix} \\) </td> \
			<td class='tablespan30'></td> \
			<td></td> \
		</tr> <tr> \
			<td> Rotation: </td> \
			<td></td> \
			<td> \\( {\\bf R}_x(\\theta) = \\begin{bmatrix} \
				1 &                &                 & \\\\ \
				  & \\cos{\\theta} & -\\sin{\\theta} & \\\\ \
				  & \\sin{\\theta} &  \\cos{\\theta} & \\\\ \
				  &                &                 & 1    \
			\\end{bmatrix} \\) </td> \
			<td></td> \
			<td> \\( {\\bf R}(-\\theta) = {\\bf R}(\\theta)^{-1} = {\\bf R}(\\theta)^\\top \\) </td> \
		</tr> <tr> \
			<td> Scaling: </td> \
			<td></td> \
			<td> \\( {\\bf S}(s_x,s_y,s_z) = \\begin{bmatrix} \
				s_x &     &     &   \\\\ \
				    & s_y &     &   \\\\ \
				    &     & s_z &   \\\\ \
				    &     &     & 1      \
			\\end{bmatrix} \\) </td> \
			<td></td> \
			<td></td> \
		</tr> <tr> \
			<td> Shear: </td> \
			<td></td> \
			<td> \\( \\begin{bmatrix} \
				1 & a &   &   \\\\ \
				  & 1 &   &   \\\\ \
				  &   & 1 &   \\\\ \
				  &   &   & 1      \
			\\end{bmatrix} \\) </td> \
			<td></td> \
			<td></td> \
		</tr> \
	</table> \
	<h3 anchorid='a0b2'> Affine Transformation </h3> \
	<p> \\( \\begin{bmatrix} \
		a & b & c & t_x \\\\ \
		d & e & f & t_y \\\\ \
		g & h & i & t_z \\\\ \
		  &   &   & 1        \
	\\end{bmatrix} \\) </p> \
	<h3 anchorid='a0b3'> Euler Angle </h3> \
	Order: Z (Roll) → X (Pitch) → Y (Yaw) \
	Gimbal Lock: mapping of Euler angles to rotations is \\( n \\) to \\( 1 \\) \
	Quaternion: \\( (x,y,z,w) \\) used for linear interpolation \
	<h4 anchorid='a0b3c0'> Rodrigues' Rotation Formula </h4> \
	<p> Rotation by angle \\( \\alpha \\) around axis \\( {\\bf n} \\) </p> \
	<p> \\( {\\bf R}({\\bf n},\\alpha) = \\cos(\\alpha){\\bf I} + (1-\\cos(\\alpha)){\\bf nn}^\\top + \\sin{\\alpha} \\begin{bmatrix} \
		     & -n_z &  n_y \\\\ \
		 n_z &      & -n_x \\\\ \
		-n_y &  n_x &           \
	\\end{bmatrix} \\) </p> \
";