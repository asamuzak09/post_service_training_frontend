import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { sha512 } from "js-sha512";
import styled from 'styled-components';
import { getProfile } from "../../hooks/api/getProfile";
import { getUserPosts } from "../../hooks/api/getUserPosts";
import { PostList } from "../../components/postList";
import { useSession } from "next-auth/react";
import { Profile } from "../../types/profile";

type Props = {
  className?: string
}

const ProfilePageBase: React.FC<Props> = ({className}) => {
  const [showAllPosts, setShowAllPosts] = useState(true)

  
  const { data: session } = useSession();
  
  const [profile, setProfile] = useState<Profile | undefined>()

  const setProfileResult = async (userId: number) => {
    const result = await getProfile(userId)
    setProfile(result)
  }

  if(session && session.user.userId){
    setProfileResult(session.user.userId)
  }

  const posts = getUserPosts();

  if(!profile){
    return (<div>loading</div>)
  }

  return (
    <div className={className} >
      <div className={`${className}__backgrond-image`}>
        <img 
          className={`${className}__backgrond-image--image`}
          src={profile.backGroundUrl}
        />
      </div>

      <div className={`${className}__profile-icon`}>
        <img className={`${className}__profile-icon--icon`} src={profile.iconUrl} />
      </div>

      <div className={`${className}__profile`} >
        <div className={`${className}__change-profile`}>
          <button type="button" className={`${className}__change-profile--button`}>変更</button>
        </div>
        <div className={`${className}__profile-name`}>{profile.profileName}</div>
        <div className={`${className}__account-id`}>@{profile.accountId}</div>
        <div className={`${className}__comment`}>{profile.statusMessage}</div>
        
        <div className={`${className}__profile-status`}>

          {profile.location && 
            <div className={`${className}__profile-status--inner`}>
              <img 
                className={`${className}__profile-status--inner--icon`}
                src="/images/map_pin.svg"
              />
              <span className={`${className}__profile-status--inner--text`}>{profile.location}</span>
            </div>
          }

          {profile.birthday &&
            <div className={`${className}__profile-status--inner`}>
              <img 
                className={`${className}__profile-status--inner--icon`}
                src="/images/birthday_icon.svg"
              />
              <span className={`${className}__profile-status--inner--text`}>{profile.birthday}</span>
            </div>
          }

        </div>

        <div className={`${className}__follow-count`}>
          <span className={`${className}__follow-count--number`}>{profile.followCount}</span>
          <span className={`${className}__follow-count--text`}>フォロー中</span>
          <span className={`${className}__follow-count--number`}>{profile.followerCount}</span>
          <span className={`${className}__follow-count--text`}>フォロワー</span>
        </div>
      </div>
      

      <div className={`${className}__filter-tab`}>
        <div 
          className={`${className}__filter-tab--${showAllPosts ? "selected" : "not-selected"}`}
          onClick={()=>{setShowAllPosts(true)}}
        >投稿</div>
        <div 
          className={`${className}__filter-tab--${!showAllPosts ? "selected" : "not-selected"}`}
          onClick={()=>{setShowAllPosts(false)}}
        >いいね</div>
      </div>

      <PostList 
        posts={posts}
      />

    </div>
  );
};

export const ProfilePage = styled(ProfilePageBase)`
  font-family: 'Noto Sans JP';
  &__profile{
    margin-left: 27px;
  }

  &__backgrond-image{
    width: 100%;
  }

  &__profile-icon{
    position: absolute;
    left: 23px;
    top: 100px;
  }

  &__change-profile{
    display: flex;
    justify-content: flex-end;
    &--button{
      width: 50px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      box-sizing: border-box;
      border: 0.5px solid orange;
      border-radius: 30px;
      background-color: #FFF;
      color: orange;
    }
  }

  &__profile-name{
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    color: black;
  }
  
  &__account-id{
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    color: grey;
  }
  &__comment{
    margin-top: 11px;
    font-size: 11px;
    color: black;
  }

  &__profile-status{
    margin-top: 18px;
    &--inner{
      &--text{
        margin-left: 5px;
      }
   }
  }

  &__follow-count{
    display: flex;
    margin-top: 14px;
    &--number{
      font-weight: bold;
      margin-right: 10px;
    }
    &--text{
      margin-right: 25px;
      color: gray;
    }
  }
  
  &__filter-tab{
    margin: 13px 0 0 25px;
    display: flex;
    justify-content: space-around;
    &--selected{
      width: 50%;
      text-align: center;
      border-bottom: solid 1px orange;
    }
    &--not-selected{
      width: 50%;
      text-align: center;
    }
  }
`
export default ProfilePage;


