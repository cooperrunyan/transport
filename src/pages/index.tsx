import type { UserData } from '-/lib/getUserData';
import { logout } from '-/lib/logout';

const Page: React.FC<{ data: UserData }> = ({ data }) => {
  return (
    <div>
      hello {data?.email} {data?.username} <button onClick={logout}>logout</button>
    </div>
  );
};

export default Page;

export { getServerSideProps } from '../lib/getUserData';
