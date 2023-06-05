import ProfileImage from '~/components/ProfileImage';

const Profile = () => {
  return (
    <main className="w-full h-full p-4 mx-auto md:p-10 bg-gray-50 max-w-7xl">
      <h1>Profile Page</h1>
      {/* 프로필 이미지 업로드 혹은 제거 가능 */}
      <ProfileImage />
    </main>
  );
};

export default Profile;
