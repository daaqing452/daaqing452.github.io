var str_parallel_programming = "\
	<h1> Parallel Progrmming </h1> \
	<p> <b>Udacity CS344</b>: [<a href='https://classroom.udacity.com/courses/cs344'>Lecture</a>] </p> \
	<p> Update v0: 2020.12.22 </p> \
	<h2> Parallel Computing Model </h2> \
	<h3> CPU vs. GPU </h3> \
	<table cellpadding='5px'> \
		<tr style='border-bottom: 1px solid #000000; border-top: 1px solid #000000;'> \
			<td> </td> \
			<td> <b>CPU</b> </td> \
			<td> <b>GPU</b> </td> \
		</tr> <tr> \
			<td> <b>Control Hardware</b> </td> \
			<td class='table_padding20'> One; complex; flexibility </td> \
			<td> Mass; simple; restrictive </td> \
		</tr> <tr> \
			<td> <b>Power</b> </td> \
			<td> High </td> \
			<td> Low for each unit </td> \
		</tr> <tr> \
			<td class='table_padding20'> <b>Optimization Objective</b> </td> \
			<td> Latency (s) </td> \
			<td> Throughput (#task/s) </td> \
		</tr> <tr style='border-bottom: 1px solid #000000;'> \
			<td> <b>Tasks Good At</b> </td> \
			<td> </td> \
			<td> Many repetitive tasks </td> \
		</tr> \
	</table> \
	<h3> GPU Architecture </h3> \
	<ul> \
		<li> A GPU has many streaming multiprocessors (SMs) </li> \
		<li> An SM has many simple processors that can run many parallel threads </li> \
		<li> A thread block contains many threads; all threads in one block cooperate to solve a subproblem </li> \
		<li> A kernel contains many blocks; no communication between blocks </li> \
	</ul> \
	<img width='700px' src='note_files/parallel_programming/gpu_architecture.png'/> \
	<p> -&emsp; The programmer defines blocks in software; the GPU allocates blocks to SMs </p> \
	<p> -&emsp; Scalability: SM can schedule another block immediately when it's idle </p> \
	<p> Guarantee: </p> \
	<p> -&emsp; An SM may run more than one block; a block can be run in only one SM </p> \
	<p> -&emsp; All blocks in a kernel finish before any block from the next kernel </p> \
	<p> Not guarantee: </p> \
	<p> -&emsp; The order of threads and blocks </p> \
	<p> -&emsp; When and where blocks will run </p> \
	<h3> Memory </h3> \
	<ul> \
		<li> Local memory: accessed by the thread only </li> \
		<li> Shared memory: accessed by threads in a thread block (__shared__) </li> \
		<li> Global memory: accessed by any threads </li> \
		<li> Host memory: memory in CPU, copying from/to GPU global memory </li> \
	</ul> \
	<p> Speed: local > shared >> global >> host </p> \
	<p> -&emsp; CPU is \"host\"; dominate (send command to) the GPU \"device\" </p> \
	<p> -&emsp; Both CPU & GPU have their own separated memories (DRAM) </p> \
	<p> -&emsp; CPU & GPU are connected by PCIe (commonly 6GB/s) </p> \
	<p> -&emsp; PCI can transfer memory that has been page locked or pinned; it keeps a special chunk of pinned host memory set aside for this purpose </p> \
	<h3> Synchronization </h3> \
	<h4> Barrier </h4> \
	<p> Point in the program where threads stop and wait (<code>__syncthreads</code>) </p> \
	<p> When all threads have reached the barrier, they can proceed </p> \
	<p> Implicit barriers between kernels </p> \
	<h4> Atomic Operation </h4> \
	<p> Use atomic functions (e.g., <code>atomicAdd</code>) </p> \
	<p> Only certain operations & data types supported </p> \
	<p> Serialize access to memory - slow </p> \
	<h3> CUDA Programming Pipeline </h3> \
	<p> Code: xxx.cu </p> \
	<p> Compiler: nvcc </p> \
	<ol> \
		<li> Allocate GPU memory (<code>cudaMalloc</code>) </li> \
		<li> Copy data from CPU to GPU (<code>cudaMemcpy</code>) </li> \
		<li> Launch kernels on GPU to compute (<code>kernel_name&lt;&lt;&lt;dim3,dim3&gt;&gt;&gt;(param)</code>) </li> \
		<li> <p> Kernel get index (<code>threadIdx.x</code>) </p> \
		<p> Then computes tasks sequentially (<code>__global__ void kernel_name(param)</code>) </p> </li> \
		<li> Copy data from GPU to CPU </li> \
	</ol> \
	<h3> Dynamic Parallel </h3> \
	<p> Launch another kernel inside a kernel </p> \
	<p> Work well for recursive parallelism (e.g., quicksort) </p> \
	<p> Resources except global memory are not shared between parent kernel and child kernel </p> \
	<p> Launching on-the-fly makes it greater GPU utilization </p> \
	<h2> Algorithm </h2> \
	<h3> Fundamental </h3> \
	<table> \
		<tr> \
			<td> <b>Step</b>: </td> <td> how long to complete a particular computation task for a thread </td> \
		</tr> <tr> \
			<td class='table_padding20'> <b>Work</b>: </td> <td> Total amount of tasks for a kernel </td> \
		</tr> \
	</table> \
	<img width='200px' src='note_files/parallel_programming/fundamental.png'/> \
	<h3> Reduce </h3> \
	<p> Tasks like sum an array </p> \
	<p> Reduce elements into a value with reduction operator \\( \\otimes \\) (binary & associative) </p> \
	<p> \\( \\text{Reduce}(\\{S_1,S_2\\},\\otimes)=\\text{Reduce}(S_1,\\otimes)&ensp;\\otimes&ensp;\\text{Reduce}(S_2,\\otimes) \\) </p> \
	<p> * Step complexity: \\(\\log{⁡n}\\) </p> \
	<h3> Scan </h3> \
	<p> Tasks like prefix sum </p> \
	<table> \
		<tr> \
			<td> Exclusive scan: </td> \
			<td> \\( \\text{Scan}([a_1,a_2,\\cdots,a_n],\\otimes) = [\\varnothing,&ensp;a_1,&ensp;a_1\\otimes a_2,&ensp;\\cdots,&ensp;a_1\\otimes a_2\\otimes\\cdots\\otimes a_{n-1}] \\) </td> \
		</tr> <tr> \
			<td> Inclusive scan: </td> \
			<td> \\( \\text{Scan}([a_1,a_2,\\cdots,a_n],\\otimes) = [a_1,&ensp;a_1\\otimes a_2,&ensp;\\cdots,&ensp;a_1\\otimes a_2\\otimes\\cdots\\otimes a_n] \\) </td> \
		</tr> \
	</table> \
	<p> Identity element \\(\\varnothing\\):&ensp; \\(x\\otimes\\varnothing=x\\) </p> \
	<h4> Segmented Scan </h4> \
	<p> To scan many small arrays, instead of scan them individually, combine them into a large array and scan </p> \
	<P> Use another 0/1 array to mark the heads of small arrays </p> \
	<h4> Hillis-Steele Inclusive Scan </h4> \
	<img width='280px' src='note_files/parallel_programming/scan_0.png'/> \
	<p> At step \\(i\\), for element \\(x\\), add itself to the element in \\(x-2^i\\) </p> \
	<p> * Step complexity: \\(\\log{⁡n}\\) </p> \
	<p> * Work complexity: \\(n\\log{⁡n}\\) </p> \
	<h4> Blelloch Exclusive Scan </h4> \
	<img width='500px' src='note_files/parallel_programming/scan_1.png'/> \
	<p> Step complexity: \\(2\\log{⁡n}\\) </p> \
	<p> Work complexity: \\({\\rm O}(n)\\) </p> \
	<h3> Histogram </h3> \
	<p> Tasks like divide data into bins </p> \
	<p> Set #bin <a href='#_Privatization_'>local bins</a> in each thread, and do accumulation, then <a href='#_Reduce_'>reduce</a> #thread local bins to a global bin </p> \
	<p> Avoid using atomic operations to global bins </p> \
	<h3> Compact & Allocate </h3> \
	<table> \
		<tr> <td class='table_padding20'> Compact: </td> <td> tasks like filter a subset of elements </td> </tr> \
		<tr> <td class='table_padding20'> Allocate: </td> <td> tasks like allocate dynamic space for element with different sizes </td> </tr> \
	</table> \
	<ol> \
		<li> Run predicate to get an array of prediction (Compact: true/false; Allocate: #space) </li> \
		<li> <a href='#_Blelloch_Exclusive_Scan_'>Exclusive sum scan</a>, output is scatter addresses for new array </li> \
		<li> Scatter elements of the prediction array into the new array using its address </li> \
	</ol> \
	<img width='200px' src='note_files/parallel_programming/compact_allocate.png'/> \
	<h3> Odd-Even Sort (Brick Sort) </h3> \
	<p> Sort pairs of elements alternatively </p> \
	<p> * Step complexity: \\(n\\) </p> \
	<p> * Work complexity: \\(n^2\\) </p> \
	<img width='150px' src='note_files/parallel_programming/odd-even_sort.png'/> \
	<h3> Merge Sort </h3> \
	<ul> \
		<li> <p> [<i>Stage 1</i>] tasks are small, #task >> #SMs </p> \
		<p>Complete small merge tasks per thread using a serial algorithm <p> </li> \
		<li> <p> [<i>Stage 2</i>] tasks are medium, #task ≈ #SMs </p> \
		<p> Complete a task per thread block using <b>parallel merge</b> </p> \
		<ol> \
			<li> Start merge two sorted list \\(A\\) and \\(B\\) </li> \
			<li> Binary search the position \\(p\\) of \\(A_i\\) in \\(B\\), get the final address \\(i+p\\) in merged list for \\(A_i\\) </li> \
			<li> Every thread belongs to one element in \\(A\\) or \\(B\\), run parallelly in shared memory </li> \
		</ol> </li> \
		<li> <p> [<i>Stage 3</i>] tasks are large, #task << #SMs \ </p> \
		<ol> \
			<li> Break up two big lists with splitters with a medium span </li> \
			<li> Sort splitters using <u>parallel merge</u> </li> \
			<li> For two adjacent splitters from different lists, sort their confusing parts using parallel merge </li> \
			<li> Get all addresses of elements and construct the final merged list </li> \
		</ol> \
	</ul> \
	<img width='400px' src='note_files/parallel_programming/merge_sort.png'/> \
	<h3> Sorting Network </h3> \
	<p> Obviousness: behavior is independent of programs or data </p> \
	<h4> Bitonic Sorting Network </h4> \
	<p> * Step complexity: \\({\\rm O}\\left\(\\log^2{⁡n}\\right\)\\) </p> \
	<img width='300px' src='note_files/parallel_programming/sorting_network_0.png'/> \
	<p> Bitonic sequence: a sequence only change direction at most once </p> \
	<p> A bitonic sequence can be separated into two bitonic subsequences (a larger half & a smaller half) by pairwise comparison </p> \
	<img width='300px' src='note_files/parallel_programming/sorting_network_1.png'/> \
	<p> Bitonic sorting network works like divide and conquer (note: sequence reverse in bitonic separation) </p> \
	<h4> Odd-Even Merge Sorting Network </h4> \
	<img width='150px' src='note_files/parallel_programming/sorting_network_2.png'/> \
	<h3> Radix Sort </h3> \
	<ol> \
		<li> Sort by bits from low to high </li> \
		<li> <p> Split elements into two sets based on i<sup>th</sup> bit, otherwise preserve order </p> \
		<p> Using two passes of <a href='#_Compact_&_Allocate_'>compact algorithm</a> to get new addresses of elements with 0s or 1s </p> </li> \
		<li> Move to the next bit & repeat </li> \
	</ol> \
	<p> * Step complexity: \\({\\rm O}\\left\(\\log^2{⁡n}\\right\)\\) </p> \
	<h3> Quicksort </h3> \
	<ol> \
		<li> Choose pivot element P </li> \
		<li> Compare all elements with pivot, split into three subarrays: &lt;P, =P or &gt;P </li> \
		<li> Segmented compact on the array to get new addresses </li> \
		<li> Recursion on each subarray </li> \
	</ol> \
	<h2> Optimization </h2> \
	<h3> High-Level Strategies </h3> \
	<ul> \
		<li> <p> Maximize arithmetic intensity: </p> \
		$$ \\frac{\\text{math}}{\\text{memory}} \\hspace{100cm} $$ \
		<ul> \
			<li> Maximize compute operations per thread </li> \
			<li> <p> Minimize time spend on memory per thread </p> \
			<p> Move frequently-accessed data to fast memory </p> </li> \
			<li> <p> Coalesced global memory access </p> \
			<p> GPU is most efficient when thread read/write contiguous memory locations </p> </li> \
		</ul> </li> \
		<li> <p> Avoid thread divergence </p> \
		<p> Make threads in the same thread block execute in the same branch or loop number </p> </li> \
	</ul> \
	<h3> Little's Law </h3> \
	<p> #byte delivered = average latency of each transaction * bandwidth </p> \
	<p> GPU: #useful bytes delivered = average latency * bandwidth </p> \
	<h3> Occupancy </h3> \
	<p> Find the bottleneck of the device, and control the parameters to optimize </p> \
	<p> Each SM has a limited resource (by command <code>deviceQuery</code>): </p> \
	<table> \
		<tr> <td> Thread blocks: </td> <td> 8 </td> </tr> \
		<tr> <td> Threads: </td> <td> 1536/2048 </td> </tr> \
		<tr> <td class='table_padding20'> Maximum #thread per block: </td> <td> 1024 </td> </tr> \
		<tr> <td> Registers for all threads: </td> <td> 65536 </td> </tr> \
		<tr> <td> Bytes of shared memory: </td> <td> 16K-48K </td> </tr> \
	</table> \
	<h3> Parallel Optimization Strategies </h3> \
	<h4> Data Layout Transformation </h4> \
	<p> Recognize data layout for better memory performance: AoS or SoA </p> \
	<table cellpadding='5px'> \
		<tr style='border-bottom: 1px solid #000000; border-top: 1px solid #000000;'> \
			<td style='padding-right: 50px'> \
				Array of structures (AoS) \
			</td> \
			<td> \
				Structure of arrays (SoA) \
			</td> \
		</tr> <tr style='border-bottom: 1px solid #000000;'> \
			<td> <code> \
				struct S { <br/> \
				&emsp; float a; <br/> \
				&emsp; float b; <br/> \
				} A[8]; \
			</code> </td> \
			<td> <code> \
				struct S { <br/> \
				&emsp; float a[8]; <br/> \
				&emsp; float b[8]; <br/> \
				} A; \
			</code> </td> \
		</tr> \
	</table> \
	<h4> Scatter-To-Gather Transformation </h4> \
	<table cellpadding='5px'> \
		<tr style='border-bottom: 1px solid #000000; border-top: 1px solid #000000;'> \
			<td> \
				Scatter \
			</td> \
			<td> \
				Gather \
			</td> \
		</tr> <tr style='border-bottom: 1px solid #000000;'> \
			<td style='padding-right: 50px'> <code> \
				b[i-1] += a[i] / 3; <br/> \
				b[i] += a[i] / 3; <br/> \
				b[i+1] += a[i] / 3; \
			</code> </td> \
			<td> <code> \
				b[i] = (a[i-1] + a[i] + a[i+1]) / 3; \
			</code> </td> \
		</tr> \
	</table> \
	<p> Gather is better than scatter because: </p> \
	<ul> \
		<li> Scatter causes many potential conflicting writes </li> \
		<li> Gather has many overlapping reads </li> \
	</ul>  \
	<h4> Tiling </h4> \
	<p> Buffer data into fast on-chip storage for repeated access (shared memory, caches) </p> \
	<p> Process large N×N matrix by small P×P tiles to advance coalesced reads/writes </p> \
	<h4> Privatization </h4> \
	<p> Set thread-local or thread-block-local output buffers, and reduce local buffers to get global output </p> \
	<p> Avoid write conflicts in global memory </p> \
	<h4> Binning / Spatial Data Structure </h4> \
	<p> Build data structure that maps output locations to a subset of the relevant input data (e.g., grid partition on a geometry map, only consider adjacent grids) </p> \
	<h4> Compaction </h4> \
	<p> If only process a few elements in the original array, <a href='#_Compact_&_Allocate_'>compact</a> them into a new array </p> \
	<h4> Regularization </h4> \
	<p> Reorganize input data (e.g., order) to reduce workload imbalance (irregular parallelism => regular parallelism) </p> \
	<p> Different element, different kernel/algorithm/resource </p> \
	<h3> Thread Divergence </h3> \
	<p> Threads in one thread block execute in the same flow </p> \
	<p> Branches (<code>if</code>) and loops (<code>for</code>) will make threads idle when executing different paths </p> \
	<img width='700px' src='note_files/parallel_programming/thread_divergence.png'/> \
	<h3> Warp </h3> \
	<p> Set of threads (e.g., #thread=32) that execute the same instruction at a time </p> \
	<p> At most 32x slowdown when executing no matter how many threads in a thread block </p> \
	<p> CUDA assigns thread IDs to warps from fastest to slowest: x > y > z </p> \
	<p> Should consider whether adjacent thread likely to take different paths </p> \
	<p> <b>SIMD</b>: Single Instruction, Multiple Data </p> \
	<p> Modern CPU use vector instructions set (with vector registers): SSE (e.g., float4) or AVX (e.g., float8) </p> \
	<p> <b>SIMT</b>: Single Instruction, Multiple Thread </p> \
	<h3> CPU-GPU Interaction </h3> \
	<ul> \
		<li> Use <code>cudaHostMalloc</code> to allocate pinned host memory </li> \
		<li> Use <code>cudaHostRegister</code> to take some data that are already allocated and pin it </li> \
		<li> Use <code>cudaMemcpyAsync</code> to copy asynchronously </li> \
	</ul> \
	<h4> Streams </h4> \
	<p> Overlap memory transfer & compute by putting them in different streams and executing together </p> \
	<p> Help fill GPU with smaller kernels </p> \
	<code> <p> cudaStream_t s1; <p> \
	<p> cudaStreamCreate(&s1); </p> \
	<p> cudaMemcpy(dst, src, numBytes, s1); </p> \
	<p> kernel_name<<<dim3, dim3, s1>>>(params); </p> \
	<p> cudaStreamDestroy(s1); </p> </code> \
	<h3> Assorted Math Optimization </h3> \
	<ul> \
		<li> Use double precision only when you need it </li> \
		<li> Use intrinsics when possible (e.g., <code>__sin</code>, <code>__cos</code>, <code>__exp</code>) </li> \
	</ul> \
	<h2> Application </h2> \
	<h3> All Pairs N-Body </h3> \
	<p> Tasks like simulate particle system </p> \
	<p> Calculate forces on each element by interactive forces with other N-1 elements, then move each element based on the force </p> \
	<ol> \
		<li> Divide N×N interaction matrix into P×P <a href='#_Tiling_'>tiles</a> to use shared memory </li> \
		<li> 2.	In each P×P tile, launch P threads for each row instead of launch P×P threads for each cell </li> \
	</ol> \
	<h3> Sparse Matrix / Dense Vector Multiplication (SpMv) </h3> \
	<p> CSR (compressed sparse row format): </p> \
	$$ \\begin{bmatrix} a & & b \\\\ c & d & e \\\\ & & f \\end{bmatrix} &emsp;&emsp; \\begin{align} \\text{Value} &= \\begin{bmatrix} a&b&c&d&e&f \\end{bmatrix} \\\\ \\text{Column} &= \\begin{bmatrix} 0&2&0&1&2&2 \\end{bmatrix} \\\\ \\text{RowPtr} &= \\begin{bmatrix} 0&2&5 \\end{bmatrix} \\end{align} \\hspace{100cm} $$ \
	<p> Multiplication: </p> \
	<ol> \
		<li> \\(S\\): Create a segmented representation of values </li> \
		<li> \\(V\\): Gather vector values using column </li> \
		<li> \\(M\\): Pairwise multiply using \\(S\\) and \\(V\\) </li> \
		<li> \\(O\\): Inclusive segmented sum scan on \\(M\\) </li> \
	</ol> \
	$$ \\begin{bmatrix} a & & b \\\\ c & d & e \\\\ & & f \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix} &emsp;&emsp; \\begin{align} S &= \\left\[ \\begin{array}{cc|ccc|c} a&ensp; & b&ensp; & c&ensp; & d&ensp; & e&ensp; & f&ensp; \\end{array} \\right\] \\\\\ V &= \\begin{bmatrix} x&ensp; & z&ensp; & x&ensp; & y&ensp; & z&ensp; & z&ensp;  \\end{bmatrix} \\\\ M &= \\left\[ \\begin{array}{cc|ccc|c} ax&bz&cx&dy&ez&fz \\end{array} \\right\] \\\\ O &= \\begin{bmatrix} ax+bz & cx+dy+ez & fz \\end{bmatrix} \\end{align} \\hspace{100cm} $$ \
	<ul> \
		<li> Launch a thread for each row in sparse matrix: row length diverse, not efficient </li> \
		<li> Launch a thread for each element in sparse matrix: too many threads </li> \
		<li> Hybrid: launch a thread for the first x elements of each row, then launch threads for the rest elements </li> \
	</ul> \
	<h3> BFS </h3> \
	<h4> Brute Force (Bellman-Ford-Like) </h4> \
	<ol> \
		<li> Iterate on depths </li> \
		<li> For each depth d, parallel launch a thread for each edge, update the depth of vertices with depth d+1 </li> \
		<li> Maintain a bool flag for stop </li> \
	</ol> \
	<p> * Step complexity: \\({\\rm O}(V)\\) </p> \
	<p> * Work complexity: \\({\\rm O}(VE)\\) </p> \
	<h4> Quadratic GPU Implementation </h4> \
	<ol> \
		<li> Store the edges using forward star (an array of edges sorted by vertices + an array of start locations for vertices) </li> \
		<li> Iterate on depths </li> \
		<li> For each depth d, maintain a list of frontiers (vertices with the depth d) </li> \
		<li> Fetch frontiers' neighbors from edge array: <a href='#_Compact_&_Allocate_'>allocate</a> </li> \
		<li> Remove vertices that are already visited from the neighbors: <a href='#_Compact_&_Allocate_'>compact</a> </li> \
	</ol> \
	<p> * Step complexity: \\({\\rm O}(V)\\) </p> \
	<p> * Work complexity: \\({\\rm O}(V^2)\\) </p> \
	<h3> List Ranking </h3> \
	<p> Input: each node knows its successor & the starting node </p> \
	<p> Output: all node in order </p> \
	<ol> \
		<li> <p> Find \\(2^k\\)th successors for all node </p> \
		<p> The \\(2x\\)th successor of node \\(u\\) can be find by its \\(x\\)th successor: \\( {\\rm succ}[u,2x]={\\rm succ}[{\\rm succ}[u,x],x] \\) </p> \
		<p> * Step complexity: \\(\\log{⁡n}\\) </p> \
		<p> * Work complexity: \\(n\\log{⁡n}\\) </p> </li> \
		<li> <p> Construct all node in order </p> \
		<p> From the starting node, use first \\(x\\) nodes to find first \\(2x\\) nodes using \\({\\rm succ}[u,x]\\) </p> \
		<p> * Step complexity: \\(\\log{⁡n}\\) </p> </li> \
	</ol> \
	<h3> Cuckoo Hashing </h3> \
	<p> Typical hash table need linked chains, which is not good for parallel (workload imbalance) </p> \
	<ol> \
		<li> Set multiple hash tables (with different hash functions); each value in each table stores one element </li> \
		<li> <p> Construct: find table t; if occupied, find table t+1 </p> \
		<p> If the element x cannot occupy in all tables, kick out the element y already in table 1 and let y to find another table (augmenting path) </p> \
		<p> Not guarantee to arrange all elements, often set an iteration upper limit </p> </li> \
		<li> <p> Find: find all tables parallel </p> \
		<p> * Step complexity: \\(\\text{const.}\\) </p> </li> \
	</ol> \
	<h2> Tools </h2> \
	<h3> CUDA Libraries </h3> \
	<table> \
		<tr> <td> cuBLAS: </td> <td> Implementation of Basic Linear Algebra Subroutines </td> </tr> \
		<tr> <td> cuFFT: </td> <td> Fast Fourier transform, 1D/2D/3D FFT routines </td> </tr> \
		<tr> <td class='table_padding20'> cuSPARSE: </td> <td> BLAS-like routines for sparse matrix formats </td> </tr> \
		<tr> <td> cuRAND: </td> <td> Pseudo- and quasi-random generation routines (from particular distribution) </td> </tr> \
		<tr> <td> NPP: </td> <td> NVIDIA Performance Primitives, low-level image processing primitives </td> </tr> \
		<tr> <td> Magma: </td> <td> GPU + multicore CPU LAPACK routines </td> </tr> \
		<tr> <td> CULA: </td> <td> Eigensolvers, matrix factorization & solvers </td> </tr> \
		<tr> <td> ArrayFire: </td> <td> Framework for data-parallel manipulation of array data </td> </tr> \
	</table> \
	<h3> Thrust </h3> \
	<p> Analogous to C++ Standard Template Library (STL) </p> \
	<p> Host-side code/interface running on GPU without kernel (e.g., <code>thrust::device_vector</code>) </p> \
	<p> -&emsp; Including containers, iterators, borrow niceties from Boost library </p> \
	<p> -&emsp; Sort, scan, reduce, reduce-by-key, transform input vectors, ... </p> \
	<p> -&emsp; Interoperate with CUDA code </p> \
	<h3> CUDA Unbound (CUB) </h3> \
	<p> Software reuse in CUDA kernels, enabling unbounded parameters like #thread, shared memory </p> \
	<p> Enable optimization auto-tuning </p> \
	<p> CUDA DMA: focus movement of data from global into shared memory; make it easier to use shared memory </p> \
	<h3> Other Languages </h3> \
	<table> \
		<tr> <td> PyCUDA: </td> <td> Warp CUDA C++ </td> </tr> \
		<tr> <td> Copperhead: </td> <td> data-parallel subset of Python (generate Thrust code) </td> </tr> \
		<tr> <td class='table_padding20'> CUDA Fortran: </td> <td> Fortran with CUDA constructs </td> </tr> \
		<tr> <td> Halide: </td> <td> Image processing DSL (domain specific language) </td> </tr> \
		<tr> <td> MATLAB: </td> <td> Both warp CUDA kernels and directly targeting using only MATLAB functions; with profiler </td> </tr> \
	</table> \
	<h3> Cross-Platform Solutions </h3> \
	<table> \
		<tr> <td> OpenCL: </td> <td> Similar to CUDA </td> </tr> \
		<tr> <td class='table_padding20'> OpenGL Compute: </td> <td> Similar to CUDA, integrated with OpenGL graphics </td> </tr> \
		<tr> <td> OpenACC: </td> <td> Directives-based approach, add a few codes to legacy codes, complier automatically parallelize </td> </tr> \
	</table> \
	<h3> nSight </h3> \
	<p> NVIDIA tool to measure bandwidth utilization </p> \
	<p> NVIDIA Visual Profiler (NVVP) </p> \
	<p> Linux/Mac: nSight Eclipse </p> \
	<p> Windows: nSight Visual Studio </p> \
";