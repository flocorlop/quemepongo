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
    path: "profile",
    loadChildren: () =>
      import("./home/profile/profile.module").then(
        m => m.ProfilePageModule
      )
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then(m => m.HomePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
