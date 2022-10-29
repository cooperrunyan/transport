import style from '-/style/pages/messages.module.scss';
import { IconButton } from '../components/IconButton/IconButton';
import { CreateIcon } from '../components/icons/Create';
import { Nav } from '../components/Nav/Nav';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { DataContextProvider } from '../context/DataContext';
import { UserData } from '../types/UserData';

export { getServerSideProps } from '-/lib/getUserData';

const Page: React.FC<{ data: UserData }> = ({ data }) => {
  return (
    <DataContextProvider data={data}>
      <Nav>
        <div className={style.layout}>
          <Sidebar
            titleBar={
              <>
                <h2>Messages</h2>
                <IconButton>
                  <CreateIcon />
                </IconButton>
              </>
            }
            content={<div>content</div>}
            showSearch>
            <div>hello world</div>
          </Sidebar>
        </div>
      </Nav>
    </DataContextProvider>
  );
};

export default Page;
