import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Post } from "../../types/post";
import styled from 'styled-components';

type Props = {
  className?: string
  posts:Array<Post>
}

const Base: React.FC<Props> = ({className,posts}) => {
  return(
    <div className={`${className}__post-list`}>
        {
          posts.map((post,i) => {
            return(
              <div className={`${className}__post`} key={i}>
                <div className={`${className}__post--profile`}>
                  <div>
                    <img className={`${className}__post--profile--icon`} src="/images/Profile_icon.svg" />
                  </div>
                  <div>
                    <span className={`${className}__post--profile--name`}>{post.postUser.name}</span>
                    <span className={`${className}__post--profile--account-id`}>{post.postUser.accountId}</span>
                    <div className={`${className}__post--date`}>{post.date}</div>
                    <div className={`${className}__post--profile--contents`}>{post.content}</div>
                  </div>
                </div>
                <div className={`${className}__post--favorite`}>
                  <form>
                    <input type="image" src="/images/Mask.png"></input>
                  </form>
                </div>
              </div>
            )
          })
        }

      </div>
  )
}

export const PostList = styled(Base)`
  &__post-list{
    border-top: solid 1px grey;
      margin-top: 10px;
  }

  &__post{
    border-bottom: solid 1px grey;
    width: 100%;

    &--profile{
      margin-top: 10px;
      margin-left: 27px;
      display: flex;
      
      &--icon{
        width: 40px;
        height: 40px;
      }

      &--name{
        font-weight: bold;
        margin-left: 10px;
        font-size: 14px;
      }

      &--account-id{
        margin-left: 10px;
        font-size: 14px;
        color: grey;
      }

      &--contents{
        margin-left: 10px;
        font-size: 12px;
      }
    }

    &--date{
      margin-top: 0px;
      margin-left: 10px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.56);
    }

    &--favorite{
      margin-left: 327px;
      margin-bottom: 9px;
    }
  }
  
`