<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import CircleSlash from "@lucide/svelte/icons/circle-slash";
	import CircleDot from "@lucide/svelte/icons/circle-dot";
	import ChevronRight from "@lucide/svelte/icons/chevron-right";
	import GraduationCap from "@lucide/svelte/icons/graduation-cap";
	import University from "@lucide/svelte/icons/university";
	import BookMarked from "@lucide/svelte/icons/book-marked";
	import LayoutPanelLeft from "@lucide/svelte/icons/layout-panel-left";
	import Bell from "@lucide/svelte/icons/bell";
	import Settings_2 from "@lucide/svelte/icons/settings-2";
	import CircleDashed from "@lucide/svelte/icons/circle-dashed";
	import Users from "@lucide/svelte/icons/users";
	import GitPullRequestArrow from "@lucide/svelte/icons/git-pull-request-arrow";
	import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";
	import Leaf from "@lucide/svelte/icons/leaf";
</script>

<Sidebar.Provider>
	<Sidebar.Root>
		<!-- header -->
		<Sidebar.Header>
			<Sidebar.Menu>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
						<div
							class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
							<Leaf class="size-4" />
						</div>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold"> USTP 2025 </span>
							<span class="truncate text-xs"> Shared </span>
						</div>
						<ChevronsUpDown class="ml-auto" />
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Header>

		<!-- content -->
		<Sidebar.Content>
			<!-- documentation -->
			<Sidebar.Group>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton>
							<LayoutPanelLeft />
							Documentation
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.Group>

			<!-- workspace -->
			<Sidebar.Group class="-mt-4">
				<Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<!-- dashboard -->
					<Sidebar.Menu>
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								<LayoutPanelLeft />
								Dashboard
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					</Sidebar.Menu>

					<!-- notifications -->
					<Sidebar.Menu>
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								<Bell />
								Notifications
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					</Sidebar.Menu>

					<!-- settings -->
					<Sidebar.Menu>
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								<Settings_2 />
								Settings
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>

			<!-- scheduling -->
			<Sidebar.Group class="-mt-4">
				<Sidebar.GroupLabel>Scheduling</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						<!-- composition collapsible -->

						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								<CircleSlash />
								Composition
								<ChevronRight class="ml-auto" />
							</Sidebar.MenuButton>
							<Sidebar.MenuSub>
								<Sidebar.MenuSubItem>
									<Sidebar.MenuSubButton>
										<GraduationCap />
										Divisions
									</Sidebar.MenuSubButton>
									<Sidebar.MenuSubButton>
										<University />
										Facilities
									</Sidebar.MenuSubButton>
								</Sidebar.MenuSubItem>
							</Sidebar.MenuSub>
						</Sidebar.MenuItem>

						<!-- resource composition -->
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								<CircleDot />
								Composition
								<ChevronRight class="ml-auto" />
							</Sidebar.MenuButton>
							<Sidebar.MenuSub>
								<Sidebar.MenuSubItem>
									<Sidebar.MenuSubButton>
										<BookMarked />
										Programs
									</Sidebar.MenuSubButton>
								</Sidebar.MenuSubItem>
							</Sidebar.MenuSub>
						</Sidebar.MenuItem>

						<!-- operation collapsible -->
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								<CircleDashed />
								Operation
								<ChevronRight class="ml-auto" />
							</Sidebar.MenuButton>
							<Sidebar.MenuSub>
								<Sidebar.MenuSubItem>
									<Sidebar.MenuSubButton>
										<Users />
										Faculties
									</Sidebar.MenuSubButton>
									<Sidebar.MenuSubButton>
										<GitPullRequestArrow />
										Constraints
									</Sidebar.MenuSubButton>
								</Sidebar.MenuSubItem>
							</Sidebar.MenuSub>
						</Sidebar.MenuItem>

						<!-- generate schedule -->
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								<CircleDashed />
								Generation
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>

			<!-- analytics -->
		</Sidebar.Content>

		<!-- footer -->
		<Sidebar.Footer>
			<Sidebar.Menu>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
						<Avatar.Root class="size-8 rounded-lg">
							<Avatar.Image src={""} alt={""} />
							<Avatar.Fallback class="rounded-lg">MK</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-medium">{"mihkuno"}</span>
							<span class="truncate text-xs">{"caindayjoeninyo@gmail.com"}</span>
						</div>
						<ChevronsUpDown class="ml-auto size-4" />
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Footer>

		<Sidebar.Rail />
	</Sidebar.Root>
</Sidebar.Provider>
