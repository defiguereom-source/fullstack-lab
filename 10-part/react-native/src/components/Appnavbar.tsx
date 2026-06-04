import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useQuery, useApolloClient } from '@apollo/client/react';
import { GET_CURRENT_USER } from '../GraphQL/queries';
import type { GetCurrentUserData } from '../types/type';

const AppNavbar: React.FC = () => {
  const navigate = useNavigate();
  const client = useApolloClient();

  const { data } = useQuery<GetCurrentUserData>(GET_CURRENT_USER, {
    variables: { includeReviews: false },
  });

  const isAuthenticated = !!data?.me;

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    client.clearStore();
    navigate('/sign-in');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link px-3 ${isActive ? 'active fw-semibold' : ''}`;

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <span className="navbar-brand fw-bold me-4">Rate Repository</span>

      <div className="navbar-nav me-auto">
        <NavLink to="/repositories" className={navLinkClass}>
          Repositories
        </NavLink>

        {isAuthenticated && (
          <>
            <NavLink to="/create-review" className={navLinkClass}>
              Create a review
            </NavLink>
            {/* Ejercicio 10.26 — pestaña My reviews */}
            <NavLink to="/my-reviews" className={navLinkClass}>
              My reviews
            </NavLink>
          </>
        )}
      </div>

      <div className="navbar-nav ms-auto">
        {isAuthenticated ? (
          <button
            className="btn btn-outline-light btn-sm"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        ) : (
          <NavLink to="/sign-in" className={navLinkClass}>
            Sign in
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default AppNavbar;