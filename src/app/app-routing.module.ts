import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "outfits", pathMatch: "full" },
  {
    path: "outfits",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./outfits/outfits.module").then(m => m.OutfitsPageModule)
      },
      {
        path: ":outfitId",
        loadChildren: () =>
          import("./outfits/outfit-detail/outfit-detail.module").then(
            m => m.OutfitDetailPageModule
          )
      },
      {
        path: "edit/:outfitId",
        loadChildren: () =>
          import("./outfits/outfit-edit/outfit-edit.module").then(m => m.OutfitEditPageModule)
      }
    ]
  },
  {
    path: "new-outfit",
    loadChildren: () =>
      import("./outfits/outfit-add/outfit-add.module").then(
        m => m.OutfitAddPageModule
      )
  },
  {
    path: "profiles",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./profiles/profiles.module").then(m => m.ProfilesPageModule)
      },
      {
        path: ":profileId",
        loadChildren: () =>
          import("./profiles/profile-detail/profile-detail.module").then(
            m => m.ProfileDetailPageModule
          )
      },
      {
        path: "edit/:profileId",
        loadChildren: () =>
          import("./profiles/profile-edit/profile-edit.module").then(m => m.ProfileEditPageModule)
      },
      {
        path: "new-profile",
        loadChildren: () =>
          import("./profiles/profile-add/profile-add.module").then(
            m => m.ProfileAddPageModule
          )
      }
    ]
  }
  // ,
  // {
  //   path: "home",
  //   loadChildren: () =>
  //     import("./home/home.module").then(m => m.HomePageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
