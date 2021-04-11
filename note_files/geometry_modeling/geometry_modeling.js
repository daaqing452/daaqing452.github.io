var str_geometry_modeling = "\
	<h1> 几何建模与处理 </h1> \
	<p> <b>GAMES 102</b>: [<a href='https://www.bilibili.com/video/BV1NA411E7Yr'>bilibili</a>] [<a href='http://staff.ustc.edu.cn/~lgliu/'>刘利刚</a>] [<a href='http://games-cn.org/'>GAMES</a>] </p> \
	<p> Update v0: 2021.04.06 </p> \
	<h2> 数据拟合 </h2> \
	<h3> Weierstrass 逼近定理 </h3> \
	<p> 【定理一】闭区间上的连续函数可用多项式级数一致逼近 </p> \
	<p> 【定理二】闭区间上周期为\\( 2\\pi \\)的连续函数可用三角函数级数一致逼近 </p> \
	<h3> Fourier级数 </h3> \
	\\begin{align} \
	f(t) &= A_0+\\sum_{i=1}^{\\infty}[a_n\\cos(n\\omega t)+b_n\\sin(n\\omega t)] \\\\ \
	&= A_0+\\sum_{i=1}^{\\infty}A_n\\sin(n\\omega t+\\psi_n) \
	\\end{align} \
	<h3> 插值 </h3> \
	<p> 目标：函数\\(f\\)需要经过每个数据点（零误差） </p> \
	$$ y_i=f(x_i) $$ \
	<p> 选择一组\\(n+1\\)个基函数\\(B_k\\)，求解线性方程组解\\(a_k\\) \
	$$ \\sum_{i=0}^n{a_kB_k(x_i)=y_i} $$ \
	$$ \\begin{bmatrix} \
		B_0(x_0) & B_1(x_0) & \\cdots & B_n(x_0) \\\\ \
		B_0(x_1) & B_1(x_1) & \\cdots & B_n(x_1) \\\\ \
		\\vdots  & \\vdots  & \\ddots & \\vdots  \\\\ \
		B_0(x_n) & B_1(x_n) & \\cdots & B_n(x_n) \\\\ \
	\\end{bmatrix} \
	\\begin{bmatrix} a_0 \\\\ a_1 \\\\ \\vdots \\\\ a_n \\end{bmatrix} \
	= \\begin{bmatrix} y_0 \\\\ y_1 \\\\ \\vdots \\\\ y_n \\end{bmatrix} $$ \
	<h4> 多项式插值 </h4> \
	<p> 选择幂基 \\(1,x,x^2,\\cdots,x^n\\) </p> \
	<p> 系数矩阵为Vandermonde矩阵，方程有唯一解 </p> \
	<h4> Language插值 </h4> \
	$$ P(x)=\\sum_{i=0}^n{y_il_i(x)} $$ \
	<p> 其中 </p> \
	$$ l_i(x_j) = \\left\\{ \\begin{align} 1\\quad & 若i=j \\\\ 0\\quad & 若i\\neq j \\end{align} \\right. \\ \\ \\ $$ \
	$$ l_i(x) = \\frac{\\prod_{j\\neq i}(x-x_j)}{\\prod_{j\\neq i}(x_i-x_j)} $$ \
	<h4> Newton插值 </h4> \
	<p> 具有相同“导数”（差商）的多项式，构造\\(n\\)阶Taylor展开 </p> \
	<p> 一阶差商 </p> \
	$$ f[x_0,x_1]=\\frac{f(x_1)-f(x_0)}{x_1-x_0} $$ \
	<p> \\(k\\)阶差商 </p> \
	$$ f[x_0,x_1,\\cdots,x_k]=\\frac{f[x_1,\\cdots,x_k]-f[x_0,\\cdots,x_{k-1}]}{x_k-x_0} $$ \
	<p> Newton插值多项式为 </p> \
	$$ N_n(x)=f(x_0)+f[x_0,x_1](x-x_0)+\\cdots+f[x_0,x_1,\\cdots,x_n](x-x_0)\\cdots(x-x_{n-1}) $$ \
	<h4> 正交多项式基 </h4> \
	<p> 系数交替，互相抵消，避免病态问题 </p> \
	<p> Gram‐Schmidt 正交化 </p> \
	<h3> 插值的病态问题 </h3> \
	<p> 系数矩阵条件数高，求解不稳定，细微变化导致输出解的剧烈变化（过拟合） </p> \
	<p> Vandermonde矩阵条件数随着数据点\\(n\\)呈指数级增长 </p> \
	<h4> 条件数 </h4> \
	<p> 最大特征值和最小特征值之间的比例 </p> \
	<p> 条件数大意味着基元之间有太多的相关性 </p> \
	$$ \\kappa_2(\\bf A)=\\frac{\\max_{x\\neq 0}{\\frac{||{\\bf A}x||}{||x||}}}{\\min_{x\\neq 0}{\\frac{||{\\bf A}x||}{||x||}}} $$ \
	<h4> Runge 现象 </h4> \
	<p> 震荡现象对插值点数的高敏感性 </p> \
	<h3> 逼近（最小二乘法） </h3> \
	<p> 目标：函数\\(f\\)最小化与数据点的L2误差 </p> \
	$$ f=\\mathop{\\arg\\min}_{f\\in \\text{span}(B)}{\\sum_{j=1}^m{(f(x_j)-y_j)^2}} $$ \
	<p> 令 </p> \
	$$ {\\bf M}=\\begin{bmatrix} \
	x_0^{(0)} & x_0^{(1)} & \\cdots & x_0^{(n)} \\\\ \
	x_1^{(0)} & x_1^{(1)} & \\cdots & x_1^{(n)} \\\\ \
	\\vdots   & \\vdots   & \\ddots & \\vdots   \\\\ \
	x_m^{(0)} & x_m^{(1)} & \\cdots & x_m^{(n)} \\\\ \
	\\end{bmatrix} $$ \
	<p> 则最小解满足 </p> \
	$$ {\\bf A}=\\left\( {\\bf M}^{\\top}{\\bf M} \\right\)^{-1}{\\bf M}^{\\top}y $$ \
	<h3> RBF </h3> \
	<p> RBF（径向基函数，Radial Basis Function） </p> \
	<p> Gauss拟合函数的组合 </p> \
	$$ \\begin{align} f(x) &= w_0+\\sum_{i=0}^n{w_i\\mathcal{G}_i(x)} \\\\ \
	&= w_0+\\sum_{i=0}^n{w_i\\mathcal{G}_{0,1}{(a_ix+b_i)}} \\end{align} $$ \
	<p> <img width='800px' src='note_files/geometry_modeling/rbf0.png'/> </p> \
	<ul> <li> RBF等同于单层神经网络 </li> \
	<li> 深度神经网络拟合的本质上是叠加更多的自由度+调参 </li> </ul> \
	<p> <img width='350px' src='note_files/geometry_modeling/rbf1.png'/> </p> \
	<h4> Gauss拟合函数 </h4> \
	$$ \\mathcal{G}_{\\mu,\\sigma}(x)=\\frac{1}{\\sqrt{2\\pi}}e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}=\\mathcal{G}_{0,1} \\left\( \\frac{1}{\\sigma}x-\\frac{\\mu}{\\sigma} \\right\) $$ \
	<p> 不同均值和方差的Gauss函数都线性无关 </p> \
	<p> 与Gauss函数相比少一个\\(1/\\sigma\\) </p> \
	<h3> 正则化 </h3> \
	<p> 避免过拟合 </p> \
	<h4> 岭回归正则项 </h4> \
	$$ \\min_{\\bf W}{||{\\bf Y-WX}||^2}+\\mu||{\\bf W}||_2^2 $$ \
	<h4> 稀疏正则化 </h4> \
	<p> 解决冗余基函数（过完备） </p> \
	$$ \\min_{\\bf W}{||{\\bf Y-WX}||^2}+\\mu||{\\bf W}||_0 $$ \
	<p> 可以用于压缩：将数据\\(\\bf X\\)压缩为\\(\\bf Y\\) </p> \
	<h3> 张量积空间 </h3> \
	<p> 两个一元函数的基函数相互乘积 </p> \
	<p> 二元二次函数基函数空间为：\\( \\{ 1,x,y,x^2,y^2,xy \\} \\) </p> \
	<p> 一般张量积空间：\\( \\{ b_i(u)b_j(v) \\}, \\quad i,j\\in[0,n] \\) </p> \
	<h3> 映射 </h3> \
	$$ f:\\mathbb{R}^n\\rightarrow\\mathbb{R}^m $$ \
	<p> 其中，\\(n\\)是本征维度，\\(n\\)是映射空间维度 </p> \
	<table> \
		<tr> <td class='table_padding20'> - </td> <td> 向量值函数： </td> <td> \\( f:\\mathbb{R}^1\\rightarrow\\mathbb{R}^m \\) </td> </tr> \
		<tr> <td> - </td> <td> 参数曲线： </td> <td> \\( f:\\mathbb{R}^1\\rightarrow\\mathbb{R}^2或\\mathbb{R}^3 \\) </td> </tr> \
		<tr> <td> - </td> <td> 参数曲面： </td> <td> \\( f:\\mathbb{R}^2\\rightarrow\\mathbb{R}^3 \\) </td> </tr> \
	</table> \
	<p> <img width='400px' src='note_files/geometry_modeling/mapping.png'/> </p> \
	<h3> 参数化 </h3> \
	<p> 给定平面上系列点\\(p_i=(x_i,y_i)\\)，得到参数曲线 </p> \
	$$ \\left\\{ \\begin{align} x=x(t) \\\\ y=y(t) \\end{align} \\right. , \\quad t\\in[0,1] $$ \
	<p> 将\\(t\\)参数化，对\\((t_i,x_i)\\)和\\(t_i,y_i\\)分别求解 </p> \
	<table> \
		<tr> <td class='table_padding20'> - </td> <td> 均匀参数化： </td> <td> \\(t_{i+1}-t_i=\\text{const.}\\)；\\(t_i=i\\) </td> </tr> \
		<tr> <td> - </td> <td> 弦长参数化： </td> <td> \\( t_{i+1}-t_i=||p_{i+1}-p_i|| \\) </td> </tr> \
		<tr> <td> - </td> <td> 中心参数化： </td> <td> \\( t_{i+1}-t_i=\\sqrt{||p_{i+1}-p_i||} \\) </td> </tr> \
		<tr> <td> - </td> <td> Foley-Nielsen参数化： </td> <td> \\(t_{i+1}-t_i=||p_{i+1}-p_i||\\cdot\\left\( 1+\\frac{3}{2}\\frac{\\hat{\\alpha}_i||p_i-p_{i-1}||}{||p_i-p_{i-1}||+||p_{i+1}-p_i||}+\\frac{3}{2}\\frac{\\hat{\\alpha}_{i+1}||p_{i+1}-p_i||}{||p_{i+1}-p_i||+||p_{i+2}-p_{i+1}||} \\right\) \\) </tr> </tr> \
		<tr> <td> </td> <td> </td> <td> 其中\\( \\alpha_i=\\angle_{(p_{i-1},p_i,p_{i+1})} \\)，\\( \\hat{\\alpha}_i=\\min{\\left\( \\pi-\\alpha_i, \\frac{\\pi}{2} \\right\)} \\) </td> </tr> \
	</table> \
	<h2> 曲线建模 </h2> \
	<h3> 连续性 </h3> \
	<h4> 参数连续性 </h4> \
	<p> 给定两条曲线：\\( x_1(t) \\)定义在\\([t_0,t_1]\\)，\\( x_2(t) \\)定义在\\([t_1,t_2]\\)，如果曲线\\(x_1\\)和\\(x_2\\)从0阶至\\(r\\)阶的导数向量在\\(t_1\\)处完全相同，则称它们为\\(\\text{C}^r\\)连续的 </p> \
	<p> 不足：连续性依赖于参数的选择，同一条曲线，参数不同，连续阶也不同 </p> \
	<p> <img width='800px' src='note_files/geometry_modeling/parameter_continuity.png'/> </p> \
	<h4> 几何连续性 </h4> \
	<p> 设 \\(\\varphi(t)\\)（\\(a\\leq t\\leq b\\)）是给定的曲线，若存在一个参数变换 \\(t=\\rho(s)\\)（\\(a_1\\leq s \\leq b_1\\)）使得 \\( \\varphi(\\rho(s))\\in \\text{C}^n[a_1,b_1] \\)，且\\( \\frac{\\text{d} \\varphi(\\rho(s))}{\\text{d} s}\\neq 0 \\)，则称曲线 \\(\\varphi(t)\\)（\\(a\\leq t\\leq b\\)）是\\(n\\)阶几何连续的曲线，记为 </p> \
	$$ \\varphi(t)\\in \\text{G}^n[a,b] $$ \
	<p> 性质： </p> \
	<ul> <li> 条件\\( \\frac{\\text{d} \\varphi(\\rho(s))}{\\text{d} s}\\neq 0 \\)保证了曲线上无奇点 </li> \
	<li> 几何连续性与参数选取无关，是曲线本身固有的几何性质 </li> \
	<li> \\(\\text{G}^n\\)的条件比\\(\\text{C}^n\\)的宽，曲线类型更多 </li> </ul> \
	<ul style='list-style-type: circle'> <li> \\(\\text{G}^0\\)：两曲线有公共的连接端点，与\\(\\text{C}^0\\)的条件一致 </li> \
	<li> \\(\\text{G}^1\\)：两曲线在连接点处有公共的切线，即切线方向连续 </li> \
	<li> \\(\\text{G}^2\\)：两曲线在连接点处有公共的曲率圆，即曲率连续 </li> </ul> \
	</ul> \
	<h3> 三次样条函数 </h3> \
	<p> 函数\\(S(x)\\in\\text{C}^2[a,b]\\)，且在每个小区间\\([x_i,x_{i+1}]\\)上是三次多项式，其中\\(a\\leq x_0&lt;x_1&lt;\\cdots&lt;x_n=b\\)是给定节点，则称\\(S(x)\\)是节点\\(x_0,x_1,\\cdots,x_n\\)上的三次样条函数 </p> \
	<h4> 求解 </h4> \
	<ol> <li> \\(S(x)\\)在每个小区间\\([x_i,x_{i+1}]\\)上有4个待定系数，共\\(4n\\)个未知数 </li> \
	<li> 由于\\(S(x)\\)在每个小区间上二阶导数连续，现有\\(3n-3\\)方程 </li> \
	<li> 由于满足插值条件\\(S(x_i)=y_i\\)，现有\\((3n-3)+(n+1)=4n-2\\)个方程 </li> \
	<li> <p> 通常在\\(x_0=a\\)和\\(x_n=b\\)处各加一个条件（称为边界条件），凑成\\(4n\\)个方程，进行唯一求解 </p> \
	<p> 边界条件常为预设两段的一阶或二阶导数值，例如\\(S''(x_0)=S''(x_n)=0\\) </p> </li> </ol> \
	</ol> \
	<h4> 力学解释 </h4> \
	<p> 考虑两片压铁之间的木条，根据材料力学中的贝努利‐欧拉方程： </p> \
	$$ M(x) = EIk(x)=EI\\frac{y''(x)}{(1+(y'(x))^2)^{3/2}} $$ \
	<p> 根据小扰度假设（弯角不大于45°），\\( y'(x)\\ll 1 \\)，则\\( M(x)\\approx EIy''(x)=ax+b \\)，即\\( y(x) \\)为三次函数，那么压铁的木样条曲线为分段三次函数 </p> \
	<h4> 三弯矩方程 </h4> \
	<h3> Bernstein多项式 </h3> \
	$$ B_{n,j}(x)=\\left\( \\begin{align} n \\\\ j \\end{align} \\right\) x^j(1-x)^{n-j} $$ \
	<p> <img width='450px' src='note_files/geometry_modeling/bernstein0.png'/>&emsp; \
	<img width='450px' src='note_files/geometry_modeling/bernstein1.png'/> </p> \
	<p> 性质： </p> \
	<ul> <li> 对称性：\\(B_{n,i}(t)=B_{n,n-i}(1-t) \\)；\\(B_{n,i}(t)\\)在\\(t=\\frac{i}{n}\\)时达到最大值 </li> \
	<li> 正权性：\\( B_{n,i}(t)\\geq 0 \\)，\\( \\sum_{i=0}^n{B_{n,i}(t)}=1 \\)，对于\\(\\forall t\\in[0,1]\\)</li> \
	<li> 基性：\\(B={B_{n,0},B_{n,1},\\cdots,B_{n,n}}\\)是次数不高于\\(n\\)的多项式空间的一组基 </li> \
	<li> 递推：\\(B_{n,i}(t)=(1-t)B_{n-1,i}(t)+tB_{n-1,i-1}(t)\\) </li> \
	<li> 导数：\\( \\frac{\\text{d}}{\\text{d}t}B_{n,i}(t)=n[B_{n-1,i-1}(t)-B_{n-1,i}(t)] \\) </li> </ul> \
	<h3> Bézier曲线 </h3> \
	$$ {\\bf f}(t)=\\sum_{i=0}^n{B_{n,i}(t){\\bf p}_i} $$ \
	<p> 性质： </p> \
	<ul> <li> 凸包性：曲线在控制点组成的凸包内 </li> \
	<li> 端点： \
		<ul> <li> \\({\\bf f}(0)={\\bf p}_0\\)，\\({\\bf f}(1)={\\bf p}_n\\) </li> \
		<li> \\({\\bf f}'(0)=n[{\\bf p}_1-{\\bf p}_0]\\)，\\({\\bf f}'(1)=n[{\\bf p}_n-{\\bf p}_{n-1}]\\) </li> \
		<li> \\({\\bf f}''(0)=n(n-1)[{\\bf p}_2-2{\\bf p}_1+{\\bf p}_0]\\)，\\({\\bf f}''(1)=n(n-1)[{\\bf p}_n-2{\\bf p}_{n-1}+{\\bf p}_{n-2}]\\) </li> </ul> \
	</li> </ul> \
	<h4> de Casteljau算法 </h4> \
	<p> 利用Bernstein多项式的递推公式 </p> \
	<p> 求\\({\\bf f}(t)\\)，先在\\(n\\)个控制点依次连成的线段上取位置\\(t\\in[0,1]\\)的点，变成\\(n-1\\)个点，再用它们迭代到最终剩一个点 </p> \
	<h4> 两条Bézier曲线的拼接条件 </h4> \
	<ul> <li> \\(\\text{C}^0\\)连续：共享端点\\({\\bf p}_k\\) </li> \
	<li> \\(\\text{C}^1\\)连续：\\({\\bf p}_{k-1},{\\bf p}_k,{\\bf p}_{k+1}\\)三点共线且等长 </li> \
	<li> \\(\\text{G}^1\\)连续：\\({\\bf p}_{k-1},{\\bf p}_k,{\\bf p}_{k+1}\\)三点共线 </li> \
	<li> \\(\\text{C}^2\\)连续：\\(\\bigtriangleup_{{\\bf p}_{k-2},{\\bf p}_{k-1},{\\bf p}_k}\\)与\\(\\bigtriangleup_{{\\bf p}_k,{\\bf p}_{k+1},{\\bf p}_{k+2}}\\)相似 </li> </ul> \
	<h3> 有理Bézier曲线 </h3> \
	<p> 每个控制顶点上设置一个权系数\\(\\omega_i\\)： </p> \
	$$ {\\bf f}^{\\text{(eucl)}}(t) = \\frac{\\sum_{i=0}^n{B_{d,i}(t)\\omega_i{\\bf p}_i}}{\\sum_{i=0}^n{B_{d,i}(t)\\omega_i}} = \\sum_{i=0}^n{q_i(t){\\bf p}_i} $$ \
	<p> 其中 </p> \
	$$ q_i(t)=\\frac{B_{d,i}(t)\\omega_i}{\\sum_{j=0}^n{B_{d,j}(t)\\omega_j}},&emsp;\\sum_{i=0}^n{q_i(t)}=1 $$ \
	<ul> <li> 具有Bézier曲线的大部分性质 </li> \
	<li> 如权系数都相等，则退化为Bézier曲线 </li> \
	<li> <p> 控制顶点的权系数越大，曲线就越靠近该点 </p> \
	<p> <img width='600px' src='note_files/geometry_modeling/eucl0.png'/> </p> </li> </ul> \
	<p> 有理Bézier曲线可以表示更多类型的曲线，可以表示圆弧，而Bézier曲线不能 </p> \
	<p> <img width='200px' src='note_files/geometry_modeling/eucl1.png'/> </p> \
	<h4> 几何解释 </h4> \
	<p> 类似齐次坐标的升维：\\({\\bf x}\\rightarrow \\begin{pmatrix} \\omega{\\bf x} \\\\ \\omega \\end{pmatrix} \\)，有理Bézier曲线是升维以后，利用高维空间中的Bézier曲线投影在原维空间中形成 </p> \
	<p> <img width='150px' src='note_files/geometry_modeling/eucl2.png'/> </p> \
	<h3> B样条 </h3> \
	<p> 第\\(1\\)阶函数： </p> \
	$$ N_{1,i}(t)=\\left\\\{ \\begin{align} 1\\quad & t_i\\leq t\\leq t_{i+1} \\\\ 0\\quad & \\text{otherwise} \\end{align} \\right. $$ \
	<p> 第\\(k\\)阶（第\\(k-1\\)度）函数： </p> \
	$$ N_{k,i}(t)=\\frac{t-t_i}{t_{i+k-1}-t_i}N_{k-1,i}(t)+\\frac{t_{i+k}-t}{t_{i+k}-t_{i+1}}N_{k-1,i+1}(t) $$ \
	<p> <img width='250px' src='note_files/geometry_modeling/b-spline0.png'/> &emsp;&emsp; <img width='250px' src='note_files/geometry_modeling/b-spline1.png'/> </p> \
	<p> 给定控制点\\({\\bf p}_0,{\\bf p}_1,\\cdots,{\\bf p}_n\\)和时间点向量\\(T=\\\{t_0,t_1,\\cdots,t_n,\\cdots,t_{n+k}\\\}\\)，\\(k\\)阶B样条曲线定义为： </p> \
	$$ {\\bf f}(t)=\\sum_{i=0}^n{N_{k,i}(t)\\cdot{\\bf p}_i} $$ \
	<p> 性质： </p> \
	<ul> <li> <p> 局部性：当且仅当\\(t_i&lt;t&lt;t_{i+k}\\)时，\\(N_{k,i}(t)&gt;0\\) </p> \
	<p> 即第\\(i\\)到第\\(i+k\\)这\\(k+1\\)个时间点控制\\(k\\)阶B样条的第\\(i\\)条子曲线 </p> </li> \
	<li> 权性：当\\(t_{k-1}\\leq t\\leq t_{n+1}\\)时，\\(\\sum_{i=0}^n{N_{k,i}(t)}=1\\)；凸包性 </li> \
	<li> 一定条件下可退化为Bézier曲线 </li> \
	<li> <p> 当\\(t_i\\leq t_j\\leq t_{i+k}\\)时，\\(N_{k,i}(t)\\)在时间点\\(t_j\\)处\\(\\text{C}^{k-2}\\)光滑 </p> \
	<p> \\(m\\)个相邻的时间点重合，光滑性减少\\(m-1\\)阶；可以通过操纵时间点向量上时间点的重合控制光滑性 </p> \
	<p> 为了让曲线经过端点，可以让前\\(k\\)个或后\\(k\\)个时间点重合 </p> \
	<p> <img width='600px' src='note_files/geometry_modeling/b-spline2.png'/> </p> </li> </ul> \
	<h4> de Boor算法 </h4> \
	<p> 利用B样条函数递推公式 </p> \
	<h3> 非均匀有理B样条（Non-Uniform Rational B-Spline，NURBS） </h3> \
	<p> 在B样条基础上加上有理性，即给每个控制顶点上设置一个权系数\\(\\omega_i\\)： </p> \
	$$ {\\bf f}(t)=\\frac{\\sum_{i=0}^n{N_{d,i}(t)\\omega_i{\\bf p}_i}}{\\sum_{i=0}^n{N_{d,i}(t)\\omega_i}} $$ \
	<p> 影响NURBS曲线建模的因素 </p> \
	<ul> <li> 控制顶点:用户交互的手段 </li> \
	<li> 时间点向量：决定了B样条基函数 </li> \
	<li> 权系数：影响曲线的形状，生成圆锥曲线等 </li> </ul> \
	<h3> 细分曲线 </h3> \
	<p> 思想： </p> \
	<ul> <li> 拓扑规则（Splitting）：加入新点，组成新多边形 </li> \
	<li> <p> 几何规则（Averaging）：移动顶点，局部加权平均 </p> \
		<ul> <li> 逼近型：对所有顶点都移动 </li> \
		<li> 插值型：只对新顶点移动 </li> </ul> </li> </ul> \
	<h4> Chaikin细分 </h4> \
	<p> Chaikin割角法逼近： </p> \
	<ul> <li> 每条边取中点，生成新点 </li> \
	<li> 每个点与其相邻点平均（顺时针） </li> \
	<li> 迭代生成曲线 </li> </ul> \
	$$ \\begin{align} {\\bf p}'_{2i} &= \\frac{1}{4}{\\bf p}_{i-1}+\\frac{3}{4}{\\bf p}_i \\\\ \
	{\\bf p}'_{2i+1} &= \\frac{3}{4}{\\bf p}_i+\\frac{1}{4}{\\bf p}_{i+1} \\end{align} $$ \
	<ul style='list-style-type: circle'> <li> 极限曲线为二次均匀B样条曲线 </li> \
	<li> 节点处\\(\\text{C}^1\\)，其余点处\\(\\text{C}^{\\infty}\\) </li> </ul> \
	<p> <img width='500px' src='note_files/geometry_modeling/subdivision_curve0.png'/> </p> \
	<h4> 均匀三次B样条曲线细分 </h4> \
	<p> 拓扑规则：边分裂成两条新边 </p> \
	$$ \\begin{align} {\\bf p}'_{2i} &= \\frac{1}{8}{\\bf p}_{i-1}+\\frac{3}{4}{\\bf p}_i+\\frac{1}{8}{\\bf p}_{i+1} \\\\ \
	{\\bf p}'_{2i+1} &= \\frac{1}{2}{\\bf p}_i+\\frac{1}{2}{\\bf p}_{i+1} \\end{align} $$ \
	<h4> \\(2n\\)点插值细分 </h4> \
	<p> 补角法： </p> \
	<ul> <li> 保留原有顶点 </li> \
	<li> 对每条边，增加一个新顶点 </li> \
	<li> 迭代生成曲线 </li> </ul> \
	<ul style='list-style-type:circle'> <li> <p> 2点插值细分：</p> \
	$$ {\\bf p}'_{2i+1}=\\frac{1}{2}({\\bf p}_i+{\\bf p}_{i+1}) $$ </li> \
	<li> <p> 4点插值细分： </p> \
	$$ {\\bf p}'_{2i+1}=\\frac{{\\bf p}_i+{\\bf p}_{i+1}}{2}+\\alpha\\left\( \\frac{{\\bf p}_i+{\\bf p}_{i+1}}{2}-\\frac{{\\bf p}_{i-1}+{\\bf p}_{i+2}}{2} \\right\) $$ \
	<p> <img width='300px' src='note_files/geometry_modeling/subdivision_curve1.png'/> </p> \
	<p> 可以证明，当\\(\\alpha\\in\\left\(0,\\frac{1}{8}\\right\)\\)时，生成的细分曲线是光滑的；否则，细分曲线非光滑，生成了分形曲线（详见<b>分形几何</b>） </p> \
	<p> 典型细分方法： </p> \
	$$ {\\bf p}'_{2i+1}=-\\frac{1}{16}{\\bf p}_{i-1}+\\frac{9}{16}{\\bf p}_i+\\frac{9}{16}{\\bf p}_{i+1}-\\frac{1}{16}{\\bf p}_{i+2} $$ </li> \
	<li> <p> 6点插值细分： </p> \
	$$ {\\bf p}'_{2i+1}=\\frac{3}{256}{\\bf p}_{i-2}+\\frac{25}{256}{\\bf p}_{i-1}+\\frac{150}{256}{\\bf p}_i+\\frac{150}{256}{\\bf p}_{i+1}-\\frac{25}{256}{\\bf p}_{i+2}+\\frac{3}{256}{\\bf p}_{i+3} $$ </ul> \
	<h4> 线性曲线细分性质证明 </h4> \
	<p> 将细分过程表达成矩阵形式（新顶点是老顶点的线性组合）： </p> \
	$$  \\underbrace{\\begin{bmatrix} \\vdots \\\\ {\\bf p}'_{2i-1} \\\\ {\\bf p}'_{2i} \\\\ {\\bf p}'_{2i+1} \\\\ \\vdots \\end{bmatrix}}_{2n\\times1} = \\underbrace{\\begin{bmatrix} \\ddots & & & & \\\\ & 1/b & & & \\\\ & 1/a & 1/b & & \\\\ & & 1/a & 1/b & \\\\ & & & & \\ddots \\end{bmatrix}}_{2n\\times n} \\underbrace{\\begin{bmatrix} \\vdots \\\\ {\\bf p}_{i-1} \\\\ {\\bf p}_i \\\\ {\\bf p}_{i+1} \\\\ \\vdots \\end{bmatrix}}_{n\\times1} $$ \
	<p> 极限曲线上的点可由细分矩阵\\({\\bf M}_{\\text{subdiv}}\\)的幂次的极限求得： </p> \
	$$ \\begin{bmatrix} \\vdots \\\\ {\\bf p}^{[\\infty]} \\\\ \\vdots \\end{bmatrix} = \\lim_{k\\rightarrow\\infty}{\\bf M}^k_{\\text{subdiv}} \\begin{bmatrix} \\vdots \\\\ {\\bf p} \\\\ \\vdots \\end{bmatrix} $$ \
	<p> 其中\\({\\bf M}_{\\text{subdiv}}\\)可进行分解： </p> \
	$$ {\\bf M}_{\\text{subdiv}}=({\\bf UDU^{-1}})^k={\\bf UD}^k{\\bf U}^{-1} $$ \
	<p> 收敛的必要条件为细分矩阵的最大特征根为\\(1\\)，否则会爆炸（\\(&gt;1\\)）或收缩（\\(&lt;1\\)） </p> \
	<h4> 双圆弧插值细分 </h4> \
	<p> 非线性细分 </p> \
	<ul> <li> 给定一条边，新点为插值其两端点及两端切向的双圆弧的一个连接点，也是其两端点两端切向的所确定三角形的内心 </li> \
	<li> 每个细分步骤后调整切向 </li> \
	<li> 极限曲线\\(\\text{G}^2\\)，光顺，保形 </li> </ul> \
	<p> <img width='200px' src='note_files/geometry_modeling/subdivision_curve2.png'/> </p> \
";
