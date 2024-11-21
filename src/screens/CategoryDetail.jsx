import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Categories from "../components/screen_category_detail/Categories";
import ListProduct from "../components/screen_category_detail/ListProduct";
import SliderBanner from "../components/screen_category_detail/SliderBanner";
import { useSelector } from "react-redux";

const electronicsBanner = [
  {
    img: "https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-cool-new-mobile-phone-promotion-purple-banner-image_183067.jpg",
  },
  {
    img: "https://cdn6.f-cdn.com/contestentries/950453/21854765/58a0c9942f82f_thumb900.jpg",
  },
  {
    img: "https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-cool-new-mobile-phone-promotion-purple-banner-image_183067.jpg",
  },
  {
    img: "https://cdn6.f-cdn.com/contestentries/950453/21854765/58a0c9942f82f_thumb900.jpg",
  },
];

const fashionBanner = [
  {
    img: "https://th.bing.com/th/id/R.d1ed34ac8f711d6d807bacb7f217852c?rik=D3hF6b%2bxzryonA&riu=http%3a%2f%2fgraphicgoogle.com%2fwp-content%2fuploads%2f2017%2f10%2fFacebook-Fashion-Big-Sale-Banner.jpg&ehk=xAR7O2yBftDuPOZZ2li0TEjvnMDEw2%2fuJhTgzEniJoc%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    img: "https://i.pinimg.com/originals/02/cf/cf/02cfcffac595c832c514d58704cd82ce.jpg",
  },
  {
    img: "https://i.pinimg.com/originals/ce/99/0c/ce990c0668729dc4bafeb093ecb964dc.jpg",
  },
  {
    img: "https://img.freepik.com/premium-vector/spring-fashion-sale-banner-design-template_2239-1180.jpg",
  },
];

const beautyBanner = [
  {
    img: "https://th.bing.com/th/id/OIP.GlRN5L96y6t0nrH7PL3LGAHaEK?rs=1&pid=ImgDetMain",
  },
  {
    img: "https://t-place.jp/wp-content/uploads/2020/04/AdobeStock_317095763.jpeg",
  },
  {
    img: "https://i.ytimg.com/vi/cD_ktvG8afM/maxresdefault.jpg",
  },
  {
    img: "https://i1.wp.com/designidea4u.com/wp-content/uploads/2021/03/Skin-Care-Banner-Design-Template-Free-Download.jpg?resize=744%2C446&ssl=1",
  },
];

const freshFruitBanner = [
  {
    img: "https://th.bing.com/th/id/R.bc29feb8bedbd8929fad5c634e210bf7?rik=DOa3B5%2bNYezpWQ&pid=ImgRaw&r=0&sres=1&sresct=1",
  },
  {
    img: "https://img.freepik.com/premium-psd/healthy-food-banner-fruits-berries-isolated-white-background_88281-5691.jpg?w=2000",
  },
  {
    img: "https://img.freepik.com/premium-psd/delicious-fruit-juice-social-media-web-banner-design_440834-220.jpg?w=2000",
  },
  {
    img: "https://img.freepik.com/premium-psd/delicious-fresh-fruit-web-banner-design_440834-209.jpg",
  },
];

export default function CategoryDetail() {
  const { category } = useSelector((state) => state.search);
  return (
    <ScrollView className="flex-1 p-5 bg-white ">
      {/* <Header title="Electronics" /> */}
      <SearchBar />
      <Categories />
      <ListProduct />
      <SliderBanner
        data={
          category === "Electronics"
            ? electronicsBanner
            : category === "Fashion"
            ? fashionBanner
            : category === "Beauty"
            ? beautyBanner
            : freshFruitBanner
        }
      />
    </ScrollView>
  );
}
