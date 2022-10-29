import { useData } from '-/context/DataContext';
import { ChangeEventHandler, FormEventHandler } from 'react';
import { SearchIcon } from '../icons/Search';
import { NameCluster } from '../NameCluster/NameCluster';
import style from './Sidebar.module.scss';

interface Props {
  children: any;
  content?: any;
  titleBar?: any;
  showSearch?: boolean;
  onSearch?: FormEventHandler<HTMLFormElement>;
  onSearchKey?: ChangeEventHandler<HTMLInputElement>;
}

export const Sidebar: React.FC<Props> = ({ children, titleBar, showSearch, onSearch, onSearchKey, content }) => {
  const data = useData();
  if (!data) return <></>;
  return (
    <div className={style.layout}>
      <div className={style.Sidebar}>
        <div className={style.nameCluster}>
          <NameCluster photo={data.photoUrl} name={data.displayName} username={data.username} />
        </div>
        <div className={style.main}>
          {titleBar && <div className={style.title}>{titleBar}</div>}
          {showSearch && (
            <form
              className={style.searchForm}
              onSubmit={e => {
                e.preventDefault();
                if (onSearch) onSearch(e);
              }}>
              <SearchIcon className={style.searchIcon} />
              <input
                type="text"
                placeholder="Search..."
                className={style.searchBar + ' shadow'}
                onChange={
                  onSearchKey
                    ? e => {
                        e.preventDefault();
                        onSearchKey(e);
                      }
                    : undefined
                }
              />
            </form>
          )}
          <div className={style.content}>{content}</div>
        </div>
      </div>
      {children}
    </div>
  );
};
