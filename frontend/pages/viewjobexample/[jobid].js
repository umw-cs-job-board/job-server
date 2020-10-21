import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter();
  const currentjobid = router.query;
  console.log(currentjobid);


  return (

	<div>
	  	<h1>Job {currentjobid.jobid}</h1>
	  	<p>Here is job number {currentjobid.jobid}</p>
	</div>


	)
}

export default Post;