using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Http;

namespace IdentityServer4InMem
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            
            services.AddIdentityServer()
                .AddDeveloperSigningCredential()
                .AddInMemoryIdentityResources(identityResources)
                .AddInMemoryApiResources(apiResources)
                .AddInMemoryClients(clients)
                .AddTestUsers(TestUsers.Users);
        }
        
        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();
            app.UseDeveloperExceptionPage();

            app.Map("/api", api =>
            {
                api.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

                api.UseIdentityServerAuthentication(new IdentityServerAuthenticationOptions
                {
                    Authority = "http://localhost:5555",
                    RequireHttpsMetadata = false,
                    AllowedScopes = new List<string> { "api1" }
                });
                
                api.Run(async context =>
                {
                    await context.Response.WriteAsync("API Response!");
                });
            });

            app.UseIdentityServer();
            
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();
        }
        
        private readonly List<IdentityResource> identityResources = new List<IdentityResource>
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile()
        };

        private readonly List<ApiResource> apiResources = new List<ApiResource>
        {
            new ApiResource("api1", "My API #1")
        };
        
        private readonly List<Client> clients = new List<Client>
        {
            new Client
            {
                ClientId = "angular_spa",
                ClientName = "Angular 4 Client",
                AllowedGrantTypes = GrantTypes.Implicit,
                AllowedScopes = new List<string> {"openid", "profile", "api1"},
                RedirectUris = new List<string> {"http://localhost:4200/auth-callback", "http://localhost:4200/silent-refresh.html"},
                PostLogoutRedirectUris = new List<string> {"http://localhost:4200/"},
                AllowedCorsOrigins = new List<string> {"http://localhost:4200"},
                AllowAccessTokensViaBrowser = true
            }
        };
    }
}