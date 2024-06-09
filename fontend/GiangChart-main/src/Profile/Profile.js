import avatar from "../Image/avatar.jpg";

const Profile = () => {
  return (
    <div className="">
      <div class="flex items-center justify-center">
        <div class="bg-white w-1/3 mt-10 rounded-lg">
          <div class="flex items-center justify-center pt-10 flex-col p-6 bg-[#ddd] ">
            <img src={avatar} class="rounded-full w-32" />
            <h1 class=" font-semibold text-3xl mt-5">Lương Trường Giang</h1>
            <h1 class=" text-2xl">Mã sinh viên: B20DCPT067</h1>
            <h1 class=" text-2xl">
              Trường: Học viện công nghệ bưu chính viễn thông
            </h1>
            <div className="pt-6">
              <h1 class="text-2xl uppercase ">Ngày sinh: 14/10/2002 </h1>
              <h1 class="text-2xl ">SĐT: 0967002757</h1>
            </div>
            <h1 class=" text-2xl p-4">
              Sở thích: Đá bóng, nghe nhạc, du lịch,... <br />
              Định hướng tương lai: Sống tốt !
            </h1>
          </div>
          <div class="flex justify-between p-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
