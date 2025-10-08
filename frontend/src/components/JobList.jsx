export default function JobList({ jobs }) {
  const [internalJobs, setInternalJobs] = useState([]);

  useEffect(() => {
    if (!jobs) {
      fetchJobs().then(res => setInternalJobs(res.data));
    }
  }, [jobs]);

  const displayJobs = jobs || internalJobs;

  return (
    <div>
      <h2>Job Listings</h2>
      <ul>
        {displayJobs.map(job => (
          <li key={job.id}>
            <strong>{job.title}</strong>: {job.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
