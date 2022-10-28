import style from '-/style/pages/index.module.scss';

import type { UserData } from '-/lib/getUserData';
import { logout } from '-/lib/logout';
import { NameCluster } from '../components/NameCluster/NameCluster';
import { Nav } from '../components/Nav/Nav';
import { DataContextProvider } from '../context/DataContext';

const Page: React.FC<{ data: UserData }> = ({ data }) => {
  return (
    <DataContextProvider data={data}>
      <Nav>
        <div className={style.layout}>
          <NameCluster photo={data?.photoUrl} name={data?.displayName} username={data?.username} />
          hello {data?.email} {data?.username} <button onClick={logout}>logout</button>
        </div>
      </Nav>
    </DataContextProvider>
  );
};

export default Page;

export { getServerSideProps } from '-/lib/getUserData';
