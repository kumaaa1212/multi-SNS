import { createContext, useContext, useState } from 'react';

interface PostContextProps {
  titleText: string;
  contentText: string;
  setTitleText: (value: string) => void; 
  setContentText: (value: string) => void;
}

export const PostContext = createContext<PostContextProps>({
  titleText: '',
  contentText: '',
  setTitleText: () => {}, 
  setContentText: () => {},
});

export const PostInfo = () => useContext(PostContext)


export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({ children }: any) => {
  const [titleText, setTitleText] = useState<string>('');
  const [contentText, setContentText] = useState<string>('');

  return (
    <PostContext.Provider
      value={{ titleText, contentText, setTitleText, setContentText }}
    >
      {children}
    </PostContext.Provider>
  );
};
