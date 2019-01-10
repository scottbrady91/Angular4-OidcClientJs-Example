using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using IdentityServer4.Models;
using IdentityServer4.Quickstart.UI;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

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

            services.AddAuthentication()
                .AddIdentityServerAuthentication("api", options =>
                {
                    options.Authority = "http://localhost:5555";
                    options.RequireHttpsMetadata = false;
                    options.ApiName = "api1";
                });
        }
        
        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();
            app.UseDeveloperExceptionPage();

            app.Map("/api", api =>
            {
                api.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
                api.UseAuthentication();
                
                api.Run(async context =>
                {
                    var result = await context.AuthenticateAsync("api");
                    if (!result.Succeeded)
                    {
                        context.Response.StatusCode = 401;
                        return;
                    }

                    context.Response.ContentType = "application/json";
                    await context.Response.WriteAsync(JsonConvert.SerializeObject("API Response!"));
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