export default function NavBar() {
	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<a className="btn btn-ghost normal-case text-xl">SwiftBuyr</a>
			</div>
			<div className="flex-none">
				<div className="dropdown dropdown-end">
					<label tabIndex={0} className="btn btn-ghost btn-circle">
						<div className="indicator">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
							<span className="badge badge-sm indicator-item">
								10 {/* TODO: Replace with actual count */}
							</span>
						</div>
					</label>
					<div
						tabIndex={0}
						className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
					>
						<div className="card-body">
							<span className="font-bold text-lg">
								10 Items{/* TODO: Replace with actual count */}
							</span>
							<span className="text-info">
								Subtotal: $999{" "}
								{/* TODO: Replace with actual content */}
							</span>
							<div className="card-actions">
								<a href="/cart">
									<button className="btn btn-primary btn-block">
										View cart
									</button>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="dropdown dropdown-end">
					<label
						tabIndex={0}
						className="btn btn-ghost btn-circle avatar"
					>
						<div className="w-10 rounded-full">
							<img src="https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg" />
						</div>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<a className="justify-between" href="/profile">
								Profile
							</a>
						</li>
						<li>
							<a href="/settings">Settings</a>
						</li>
						<li>
							<a href="/logout">Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
