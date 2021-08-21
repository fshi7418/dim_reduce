# dim_reduce

**Summary**

The idea behind this visualisation is using voxels in 3D (blocks in Minecraft) in combination with the Hilbert curve to simulate dimensional reduction described in Liu Cixin's *Death's End*, which is the third book of *the Rememberance of Earth's Past* series. Due to limitations of computing resources, only the 5th iteration of Hilbert curve is used.




**Technical Notes**
1. The Hilbert curve is a space-filling curve. A space-filling curve is a continuous surjective mapping (but not injective) from the unit intreval [0,1] to R^n (and more generally, any metric space) for n >= 2. 
2. R^n, where n >= 1 is a natural number, is a formal way of saying "n-dimensional space". For example, R^2 is 2-dimensional space, R is 1-dimensional. R is otherwise known as "the real numbers" or "the real line".
3. There does exist at least one bijective (surjective and injective) mapping between R^2 and R^3, and more generally betweem R^n and R^m for any natural numbers m and n, because for any natural numbers m and n, R^n and R^m have the same cardinality (Cantor). However, it is not possible for a bijective mapping between R^n and R^m to be continuous due to topological limitations.
4. For the purpose of simulating dimensional reudction described in *Death's End*, we would prefer that the mapping is continuous, since that way, the points which are close to each other in R^3 would still be close to each other in R^2. The Hilbert Curve has this property if the iteration is repeated for enough times.
5. The fact that Hilbert's Curve is not an injective mapping as the iteration approaches infinity is "solved" by the fact that in reality, we don't need to map points (which has *zero* volume) to points, but rather atoms to atoms. Atoms possess nonzero volume, and the mapping is discreet in nature.




**How to Launch on Windows 10**

To launch, launch git bash from root directory, then execute "node server.js". Next type "localhost:3000" into the web browser to see the index of files.
Of the most interest would be 2d_1d.html, show_3d_2d.html, and 3d_2d.html. A heads up: 3d_2d.html ran very slowly on my machine's Chrome




**Pages of Interest**

2d_1d.html shows the basic mechanics of how the 5th iteration of Hilbert curve can be used to establish a pseudo-continuous mapping from R^2 to R (pseudo-continuous because we are not mapping point-to-point like in the actual math; computers do actually have a smallest unit when it comes to pictures).
show_3d_2d.html shows how the idea in 2d_1d.html can be used to map R^3 to R^2.
Finally, 3d_2d.html is the closest to what is described in Death's End: 
"The plane of the two-dimensional space rose like water, and everything that came into contact with the surface instantaneously turned into two dimensions."

