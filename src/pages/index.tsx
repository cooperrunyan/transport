import style from '-/style/pages/index.module.scss';

import type { UserData } from '-/lib/getUserData';
import { NameCluster } from '../components/NameCluster/NameCluster';
import { Nav } from '../components/Nav/Nav';
import { DataContextProvider } from '../context/DataContext';

const Page: React.FC<{ data: UserData }> = ({ data }) => {
  return (
    <DataContextProvider data={data}>
      <Nav>
        <div className={style.layout}>
          <NameCluster photo={data?.photoUrl} name={data?.displayName} username={data?.username} />
          <div className={style.content}>
            <div className={style.friends}>
              <h2>Friends</h2>
            </div>
            <div className={style.notifications}>
              <h2>Notifications</h2>
            </div>
          </div>
        </div>
      </Nav>
    </DataContextProvider>
  );
};

export default Page;

export { getServerSideProps } from '-/lib/getUserData';
