var str_parallel_programming = "\
	<h1> Parallel Progrmming </h1> \
	<p> <b>Udacity CS344</b>: <a href='https://classroom.udacity.com/courses/cs344'>Video</a> </p> \
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
	<img width='150px' src='note_files/parallel_programming/fundamental.png'/> \
	<h3> Reduce </h3> \
	<p> Tasks like sum an array </p> \
	<p> Reduce elements into a value with reduction operator \\( \\otimes \\) (binary & associative) </p> \
	<p> \\( \\text{Reduce}(\\{S_1,S_2\\},\\otimes)=\\text{Reduce}(S_1,\\otimes)&ensp;\\otimes&ensp;\\text{Reduce}(S_2,\\otimes) \\) </p> \
	<p> *** Step complexity: \\(\\log{⁡n}\\) </p> \
	<h3> Scan </h3> \
	<p> Tasks like prefix sum </p> \
	<table> \
		<tr> \
			<td> Exclusive scan: </td> \
			<td> \\( \\text{Scan}([a_1,a_2,]) \\) </td> \
		</tr> <tr> \
		</tr> \
	</table> \
	<h4> Segmented Scan </h4> \
";