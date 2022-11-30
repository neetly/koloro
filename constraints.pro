gen_enforced_field(WorkspaceCwd, 'homepage', 'https://github.com/neetly/koloro').
gen_enforced_field(WorkspaceCwd, 'repository.type', 'git').
gen_enforced_field(WorkspaceCwd, 'repository.url', 'git@github.com:neetly/koloro.git').
gen_enforced_field(WorkspaceCwd, 'repository.directory', WorkspaceCwd) :-
  WorkspaceCwd \= '.'.
gen_enforced_field(WorkspaceCwd, 'license', 'MIT').

gen_enforced_field(WorkspaceCwd, 'scripts.build', 'buncho library build') :-
  atom_concat('packages/', _, WorkspaceCwd).
gen_enforced_field(WorkspaceCwd, 'scripts.clean', 'buncho library clean') :-
  atom_concat('packages/', _, WorkspaceCwd).
gen_enforced_field(WorkspaceCwd, 'scripts.prepack', 'run clean && run build && cp ../../LICENSE .') :-
  atom_concat('packages/', _, WorkspaceCwd).

gen_enforced_dependency(WorkspaceCwd, DependencyIdent, 'workspace:^', DependencyType) :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, _, DependencyType),
  workspace_ident(_, DependencyIdent).

gen_enforced_dependency(WorkspaceCwd, DependencyIdent, DependencyRange2, DependencyType) :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, DependencyType),
  workspace_has_dependency(_, DependencyIdent, DependencyRange2, DependencyType2),
  DependencyRange \= DependencyRange2,
  DependencyType \= 'peerDependencies',
  DependencyType2 \= 'peerDependencies'.
